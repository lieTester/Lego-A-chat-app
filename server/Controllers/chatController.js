const Chats = require("../Models/chatsModel");
const { ObjectId } = require("mongodb");

module.exports.createChat = async (req, res, next) => {
  try {
    // this user is we get after middleware accessToken test the token
    // connect received from client side
    const { user, connect } = req.body;

    const _idUser1 = user._id;
    const _idUser2 = ObjectId(connect);
    // console.log(_idUser1,_idUser2);
    const data = await Chats.create({
      users: [_idUser1, _idUser2],
      chatType: { isGroup: false, admins: [_idUser1, _idUser2] },
    });
    if (data) {
      res.status = 200;
      return res.json({ msg: "Chat created", status: true });
    }
    return res.json({ msg: "Failed to create chat", status: false });
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.fetchChats = async (req, res, next) => {
  try {
    const { user } = req.body;
    const data = await Chats.find(
      {
        users: { $elemMatch: { $eq: user._id } },
      },
      { createdAt: 0, updatedAt: 0 }
    )
      .populate("users", { username: 1 })
      .populate("lastMessage", { message: { text: 1 } });

    if (data.length > 0) {
      const allChats = data.map((chat, index) => {
        let info = {};
        info.id = chat._id;
        info.Group = chat.chatType.isGroup;
        if (chat.chatType.isGroup) {
          info.users = chat.users;
          info.name = chat.chatname;
        } else {
          
          info.name =
            toString(chat.users[0]._id) === toString(user._id)
              ? chat.users[1].username
              : chat.users[0].username;
        }
        return info;
      });
      return res.status(200).json({ chats: allChats});
    }
    return res.status(500).json({ msg: "Server error" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    return res.json({ msg: "Failed to create chat", status: false });
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.deleteGroup = async (req, res, next) => {
  try {
    return res.json({ msg: "Failed to create chat", status: false });
  } catch (error) {
    return res.json({ error });
  }
};

module.exports.addAdmin = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.addUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.exitUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.removeUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};

// 630789cf31016d60ef944c1c puneet
// 630860d62c301b708e7fb879 adi
