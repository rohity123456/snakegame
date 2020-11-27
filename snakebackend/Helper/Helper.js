const { USER_DATA_KEYS, STATUS_SUCCESS } = require("../Helper/Constants");
const jwt = require("jsonwebtoken");
class Helper {
  validateUser(name, username, password) {
    let errors = [];
    name != "NA" &&
      !this.checkMinLength(name, 3, "name", errors) &&
      name != "NA" &&
      this.checkMaxLength(name, 30, "name", errors);
    !this.checkMinLength(username, 4, "username", errors) &&
      this.checkMaxLength(username, 30, "username", errors);
    password != "NA" &&
      !this.checkMinLength(password, 10, "password", errors) &&
      password != "NA" &&
      this.checkMaxLength(password, 30, "password", errors);
    return errors;
  }
  checkMinLength(input, min, key, errors) {
    if (!input || input.trim().length < min) {
      const errorObj = {};
      errorObj[key] = `${key} must be greater than ${min} characters !`;
      errors.push(errorObj);
      return true;
    }
  }
  checkMaxLength(input, max, key, errors) {
    if (!input || input.trim().length > max) {
      const errorObj = {};
      errorObj[key] = `${key} must be smaller than ${max} characters !`;
      errors.push(errorObj);
    }
  }
  some(obj, keys) {
    const toReturn = {};
    for (let key of keys) {
      console.log(key in obj);
      if (key in obj) toReturn[key] = obj[key];
    }
    console.log("toReturn", toReturn, obj.name);
    return toReturn;
  }
  sendJSONResponse(res, data, statusCode = 200, status = "SUCCESS") {
    data.status = status;
    return res.status(statusCode).json(data);
  }
  SignJWTandSendResponse(req, res, user) {
    const userData = HF.some(user, USER_DATA_KEYS);
    const token = jwt.sign(userData, process.env.PRIVATEKEY, {
      expiresIn: "2h",
    });
    res.cookie("token", token);
    return this.sendJSONResponse(res, { user: userData }, 203, STATUS_SUCCESS);
  }
}
const HF = new Helper();
module.exports = HF;
