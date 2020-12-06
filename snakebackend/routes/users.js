const express = require("express");
const Router = express.Router();
const UController = require("../controllers/users");
Router.param("userId", UController.getUserById);
Router.post("/signin", UController.signIn);
Router.post("/signup", UController.signUp);
Router.post("/test/:userId", UController.isSignedIn, (req, res) =>
  res.send(req.user)
);
Router.post(
  "/updateUserScore/:userId",
  UController.isSignedIn,
  UController.updateUserScore
);
Router.get("/highestscorers", UController.getTopTenScorers);
module.exports = Router;
