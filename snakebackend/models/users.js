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
    },
    higestScore: {
      type: Number,
      default: 0,
    },
    hashed_password: {
      type: String,
      required: true,
      maxlength: 50,
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
    this.hashed_password = this.securePassword(
      plainPassword,
      function (err, hashedKey) {
        if (err) console.log(err);
        this.hashed_password = hashedKey;
      }
    );
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  securePassword: function (plainPassword, callback) {
    if (!plainPassword) return "";
    try {
      crypto.pbkdf2(plainPassword, 1000, 64, "sha512", callback);
    } catch (exception) {
      console.log(exception);
    }
  },
  authenticateUser: function (plainPassword, callback) {
    this.securePassword(plainPassword, function (err, hashedkey) {
      callback(this.hashed_password == hashedkey);
    });
  },
};
module.exports = mongoose.model("User", UserSchema);
