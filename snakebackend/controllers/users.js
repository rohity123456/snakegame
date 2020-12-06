const { some } = require("../Helper/Helper");
const HF = require("../Helper/Helper");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {
  USER_ALREADY_EXIST_MSG,
  STATUS_FAILED,
  STATUS_SUCCESS,
  INTERNAL_SERVER_ERROR_MSG,
  USER_NOT_FOUND_MSG,
  PASS_INCORRECT,
  AUTHORIZATION,
  USER_DATA_KEYS,
} = require("../Helper/Constants");
const { use } = require("../routes/users");
class UserController {
  async signIn(req, res) {
    const { username, password } = req.body;
    const errors = HF.validateUser("NA", username, "NA");
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    try {
      const user = await User.findOne({ username });
      if (!user.authenticateUser(password))
        return HF.sendJSONResponse(
          res,
          { general: PASS_INCORRECT },
          400,
          STATUS_FAILED
        );
      const { _id: id } = user;
      const highestScores = await User.find()
        .select("higestScore")
        .sort("-higestScore")
        .exec();
      let Rank = 0;
      highestScores.find((scorer, index) => {
        Rank++;
        return scorer["_id"].toString() == id.toString();
      });
      return HF.SignJWTandSendResponse(req, res, user, Rank);
    } catch (error) {
      console.log(error);
      HF.sendJSONResponse(
        res,
        { general: USER_NOT_FOUND_MSG },
        400,
        STATUS_FAILED
      );
    }
  }
  async signUp(req, res) {
    const { name, username, password } = req.body;
    console.log(req.body);
    const errors = HF.validateUser(name, username, password);
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    const isUserExist = await User.exists({ username });
    if (isUserExist)
      return HF.sendJSONResponse(
        res,
        { general: USER_ALREADY_EXIST_MSG },
        400,
        STATUS_FAILED
      );
    const user = new User(req.body);
    user
      .save()
      .then((user) => HF.SignJWTandSendResponse(req, res, user))
      .catch((error) => {
        console.log(error);
        return HF.sendJSONResponse(
          res,
          { general: INTERNAL_SERVER_ERROR_MSG },
          500,
          STATUS_FAILED
        );
      });
  }
  //middlewares
  isSignedIn(req, res, next) {
    console.log("FROM PARAM");
    let token;
    if (
      !req.headers ||
      !req.headers.hasOwnProperty(AUTHORIZATION) ||
      !req.headers[AUTHORIZATION]
    )
      return HF.sendJSONResponse(
        res,
        { general: "No token Found" },
        400,
        STATUS_FAILED
      );
    const auth = req.headers[AUTHORIZATION];
    if (auth && typeof auth === "string") token = auth.split("Bearer ")[1];
    console.log("TOKEN ", token);
    jwt.verify(token || "", process.env.PRIVATEKEY, (err, payload) => {
      if (err)
        return HF.sendJSONResponse(
          res,
          { general: "Invalid token" },
          400,
          STATUS_FAILED
        );
      req.authUser = payload;
      next();
    });
  }
  isAuthenticated(req, res, next) {
    if (!req.user || !req.authUser || req.user._id != req.authUser._id)
      return HF.sendJSONResponse(
        res,
        { general: "User not Authenticated" },
        400,
        STATUS_FAILED
      );
    next();
  }
  async getUserById(req, res, next, id) {
    try {
      console.log("ID ", id);
      const user = await User.findById(id).exec();
      if (!user)
        return HF.sendJSONResponse(
          res,
          { general: USER_NOT_FOUND_MSG },
          400,
          STATUS_FAILED
        );
      console.log(user);
      req.user = HF.some(user, USER_DATA_KEYS);
      next();
    } catch (exception) {
      console.log(exception);
    }
  }
  //scores
  async getTopTenScorers(req, res) {
    const highestScores = await User.find()
      .limit(10)
      .sort("-higestScore")
      .exec();
    if (!highestScores)
      return HF.sendJSONResponse(
        res,
        { general: "Error while fetching records" },
        501,
        STATUS_FAILED
      );
    return HF.sendJSONResponse(res, {
      highestScores: highestScores.map((scorer) =>
        HF.some(scorer, USER_DATA_KEYS)
      ),
    });
  }
  async updateUserScore(req, res) {
    try {
      console.log("UPDATING");
      console.log("BODY ", req.body);
      const resp = await User.updateOne({ _id: req.user._id }, req.body);
      console.log("nModified : ", resp.nModified);
      if (resp.nModified)
        return res.json({
          message: "Updated Successfully!",
          status: STATUS_SUCCESS,
        });
    } catch (error) {
      console.log(error);
      HF.sendJSONResponse(
        res,
        { general: INTERNAL_SERVER_ERROR_MSG },
        500,
        STATUS_FAILED
      );
    }
  }
}

const UController = new UserController();
module.exports = UController;

// Bearer token
