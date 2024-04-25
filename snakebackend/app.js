//dependencies//
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/users");
require("dotenv").config();
//dependencies//

//Objects//
const App = express();
//Objects//
//DB CONNECTION//
mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected To Data Base "))
  .catch((err) => {
    console.log("err while connecting to the DB", err);
  });
//DB CONNECTION//
App.use(express.json());

var whitelist = ["http://127.0.0.1:5500"];
App.use(
  cors(/* {
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        console.log("ALLOWED");
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  } */)
);

//routes//

App.use("/api", UserRouter);

App.get("/", (req, res) => {
  res.json({ res: JSON.stringify(req.headers) });
});
//routes//
App.listen(8080, () => console.log("server is up and running at 8080 "));
