const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatname: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    chatType: {
      isGroup: {
        type: Boolean,
        required: true,
        default: false,
      },
      admins: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chats", chatSchema);
