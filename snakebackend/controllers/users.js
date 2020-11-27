const HF = require("../Helper/Helper");
class UserController {
  signIn(req, res) {
    const { username, password } = req.body;
    const errors = HF.validateUser("NA", username, password);
    if (errors) res.status(400).json({ errors, status: "FAIL" });
  }
  signUp(req, res) {
    const { name, username, password } = req.body;
    console.log(req.body);
    const errors = HF.validateUser(name, username, password);
    if (errors.length) {
      res.status(400).json({ errors, status: "FAIL" });
      return;
    }
    res.json({ res: `I got your name ${name}` });
  }
}
const UController = new UserController();
module.exports = UController;
