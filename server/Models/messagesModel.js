const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    chat: {
      belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats",
        required: true
      },
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messageSchema);
