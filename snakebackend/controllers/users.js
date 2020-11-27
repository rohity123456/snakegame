const { some } = require("../Helper/Helper");
const HF = require("../Helper/Helper");
const User = require("../models/users");
const {
  USER_ALREADY_EXIST_MSG,
  STATUS_FAILED,
  INTERNAL_SERVER_ERROR_MSG,
  USER_NOT_FOUND_MSG,
  PASS_INCORRECT,
} = require("../Helper/Constants");
class UserController {
  signIn(req, res) {
    const { username, password } = req.body;
    const errors = HF.validateUser("NA", username, "NA");
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    User.findOne({ username })
      .then((user) => {
        if (!user.authenticateUser(password))
          return HF.sendJSONResponse(
            res,
            { general: PASS_INCORRECT },
            400,
            STATUS_FAILED
          );
        return HF.SignJWTandSendResponse(req, res, user);
      })
      .catch((error) =>
        HF.sendJSONResponse(
          res,
          { general: USER_NOT_FOUND_MSG },
          400,
          STATUS_FAILED
        )
      );
  }
  async signUp(req, res) {
    const { name, username, password } = req.body;
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
    const user = new User({ name, username, password });
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
}
const UController = new UserController();
module.exports = UController;
