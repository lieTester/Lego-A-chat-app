const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    expires: 60 * 5,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserVerification", VerificationSchema);
