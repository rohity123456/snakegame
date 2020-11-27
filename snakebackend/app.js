//dependencies//
const mongoose = require("mongoose");
const express = require("express");
const UserRouter = require("./routes/users");
//dependencies//

//Objects//
const App = express();
//Objects//
//DB CONNECTION//
const DB_URL = "mongodb://localhost:27017/snakedb";
mongoose
  .connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected To Data Base "))
  .catch((err) => {
    console.log("err while connecting to the DB");
  });
//DB CONNECTION//
App.use(express.json());
App.use(express.urlencoded());
//routes//

App.use("/api", UserRouter);

App.get("/", (req, res) => {
  res.json({ res: JSON.stringify(req.headers) });
});
//routes//
App.listen(8080, () => console.log("server is up and running at 8080 "));
