const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { encrypter } = require("../Utils/utilFunctions");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    max: 40,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

// we cannot use arrow functions here because they use lexical this
// https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
userSchema.pre("save", async function (next) {
  // this modified nothing but if data is newly created or updated then it return true
  if (this.isModified) {
    this.password = await encrypter(this.password);
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  // we are cheking if password has changed then update to hash password
  try {
    let password = this._update.$set.password;
    if (!password) {
      next();
    } else {
      // console.log(password);
      this._update.$set.password = await encrypter(password);
    }
  } catch (error) {
    console.log("usermodel lin66", error);
  }
  next();
});

module.exports = mongoose.model("Users", userSchema);
