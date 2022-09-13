const Messages = require("../Models/messagesModel");
const Chats = require("../Models/chatsModel");
const { ObjectId } = require("mongodb");
const { update } = require("../Models/usersModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { _idFrom, _idChat, message } = req.body;

    const chat = await Chats.findOne({ _id: _idChat });
    if (!chat) {
      return res.status(404).json({ message: "Specific chat not found" });
    }

    const data = await Messages.create({
      message: { text: message },
      chat: { belongsTo: _idChat },
      sender: _idFrom,
    });
    if (data) {
      return res.status(200).json({ msg: "added to database" });
    }
    return res
      .status(417)
      .json({ msg: "Failed to add to databse ", error: " Expectation Failed" });
  } catch (error) {
    return res.statuse(400).json({ msg: error.stack });
  }
};
module.exports.getMessages = async (req, res, next) => {
  try {
    const { _idChat, _idFrom } = req.body;
    const chat = await Chats.findOne({ _id: _idChat });
    if (!chat) {
      return res.status(404).json({ message: "Specific chat not found" });
    }

    const allMessages = await Messages.find({
      chat:{
        belongsTo: chat._id,
      }
    }).sort({updatedAt:1});
    
    const chatMessages = allMessages.map((msg) => {
      return {
        fromself: msg.sender.toString() === _idFrom,
        chat: msg.message.text,
      };
    });
    return res.status(200).json({ msg: "All messages Retrived", chatMessages });
  } catch (error) {
    return res.status(400).json({ error: error.stack });
  }
};

// 630789cf31016d60ef944c1c puneet
// 630860d62c301b708e7fb879 adi
