const express = require("express");
const Router = express.Router();
const UController = require("../controllers/users");
Router.post("/signin", UController.signIn);
Router.post("/signup", express.json(), UController.signUp);
Router.post("/test", express.json(), (req, res) =>
  res.send(JSON.stringify(req.body))
);
module.exports = Router;
