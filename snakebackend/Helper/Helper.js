class Helper {
  validateUser(name, username, password) {
    let errors = [];
    name != "NA" &&
      !this.checkMinLength(name, 3, "name", errors) &&
      name != "NA" &&
      this.checkMaxLength(name, 30, "name", errors);
    !this.checkMinLength(username, 4, "username", errors) &&
      this.checkMaxLength(username, 30, "username", errors);
    !this.checkMinLength(password, 10, "password", errors) &&
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
}
const HF = new Helper();
module.exports = HF;
