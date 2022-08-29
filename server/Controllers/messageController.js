const Messages = require("../Models/messagesModel");
const { ObjectId } = require("mongodb");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, chatGroup, message } = req.body;

    const _idChat = ObjectId(chatGroup);
    const _idFrom = ObjectId(from);
    const data = await Messages.create({
      message: { text: message },
      chat: { belongsTo: _idChat },
      sender: _idFrom,
    });
    if (data) {
      return res.json({ msg: "added to database", status: true });
    }
    return res.json({ msg: "Failed to add to databse", status: false });
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.getMessages = async (req, res, next) => {
  try {
    // const { from, to } = req.body;
    // const allMessages = await Messages.find({
    //   users: {
    //     $all: [from, to],
    //   },
    // }).sort({ updatedAt: 1 });
    // const chatMessages = allMessages.map((msg) => {
    //   return {
    //     fromself: msg.sender.toString() === from,
    //     chat: msg.message.text,
    //   };
    // });
    // return res.json({ chatMessages });
  } catch (error) {
    return res.json({ error });
  }
};

// 630789cf31016d60ef944c1c puneet
// 630860d62c301b708e7fb879 adi
