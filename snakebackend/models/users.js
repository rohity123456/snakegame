const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    higestScore: {
      type: Number,
      default: 0,
    },
    hashed_password: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    salt: String,
  },
  { timestamps: true }
);
UserSchema.virtual("password")
  .set(function (plainPassword) {
    this._password = plainPassword;
    this.salt = uuidv4();
    this.hashed_password = this.securePassword(plainPassword);
    console.log(this.hashed_password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    // console.log(
    //   "AUTH ENCRYPTION : ",
    //   plainPassword,
    //   this.salt,
    //   1000,
    //   64,
    //   "sha512"
    // );
    try {
      return crypto.pbkdf2Sync(plainPassword, this.salt, 1000, 64, "sha512");
    } catch (exception) {
      console.log(exception);
    }
  },
  authenticateUser: function (plainPassword) {
    return (
      this.securePassword(plainPassword).toString() === this.hashed_password
    );
  },
};
module.exports = mongoose.model("User", UserSchema);
