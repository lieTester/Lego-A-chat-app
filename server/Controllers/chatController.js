const Chats = require("../Models/chatsModel");
const Users = require("../Models/usersModel");
const Messages = require("../Models/messagesModel");
const { ObjectId } = require("mongodb");
const { getTime } = require("../Utils/utilFunctions");

module.exports.createChat = async (req, res, next) => {
  try {
    // this user is we get after middleware accessToken test the token
    // connect received from client side
    const { user, connect } = req.body;

    const _idUser1 = user._id;
    const _idUser2 = ObjectId(connect);

    const isInContact = await Users.findOne(
      {
        _id: _idUser1,
      },
      { contacts: 1 }
    );
    if (isInContact.contacts.indexOf(_idUser2) > -1) {
      // if user already in cotacts of current user
      const chat = await Chats.find({
        $or: [
          {
            users: [_idUser2, _idUser1],
          },
          {
            users: [_idUser1, _idUser2],
          },
        ],
      });
      if (!chat) {
        return res.status(404).json({ msg: "Specific chat not found" });
      }
      const finduser = await Users.findOne({ _id: _idUser2 });
      return res.status(200).json({
        msg: "Already in contacts",
        id: chat[0]._id,
        name: finduser.username,
      });
    } else if (connect) {
      await Users.updateOne(
        { _id: _idUser1 },
        {
          $push: {
            contacts: _idUser2,
          },
        }
      );
      await Users.updateOne(
        { _id: _idUser2 },
        {
          $push: {
            contacts: _idUser1,
          },
        }
      );
      // console.log(_idUser1,_idUser2);
      const response = await Chats.create({
        users: [_idUser1, _idUser2],
        chatType: { isGroup: false, admins: [_idUser1, _idUser2] },
      });
      const finduser = await Users.findOne({ _id: _idUser2 });
      return res.status(200).json({
        msg: "chat created successfully",
        id: response._id,
        name: finduser.username,
      });
    }
    return res.status(400).json({ msg: "Failed to create chat" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports.fetchChats = async (req, res, next) => {
  try {
    const { user } = req.body;
    const data = await Chats.find(
      {
        users: { $elemMatch: { $eq: user._id } },
      },
      { createdAt: 0 }
    )
      .populate("users", { username: 1, profile: 1 })
      .populate("lastMessage", { message: { text: 1 } });
    // console.log(data, data[0].updatedAt.getDate());
    if (data.length > 0) {
      const allChats = data.map((chat, index) => {
        let info = {};
        // we have to convert id to string so  in both postman testing and front en we send
        // id as strig otherwise wile testing from postman we are sending string and from front end it render as objectid
        info.id = chat._id.toString();
        info.date = getTime(chat.updatedAt);
        info.group = chat.chatType.isGroup;
        info.message = "no messages available. . .";
        if (chat?.lastMessage) {
          // console.log(typeof chat.lastMessage)
          info.message = chat.lastMessage.message.text;
        }
        if (chat.chatType.isGroup) {
          info.name = chat.chatname;
          info.admin = chat.chatType.admins.includes(user._id);
        } else {
          info.admin = false;
          info.profile =
            chat.users[0]._id.toString() === user._id.toString()
              ? chat.users[1]?.profile
              : chat.users[0]?.profile;
          info.name =
            chat.users[0]._id.toString() === user._id.toString()
              ? chat.users[1].username
              : chat.users[0].username;
        }
        return info;
      });
      return res.status(200).json({ chats: allChats });
    }
    return res.status(204).json({ msg: "None content" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    const { user, users, name } = req.body;
    const _idAdmin = user._id;
    const _idUsers = users.map((user) => {
      return ObjectId(user);
    });
    // console.log(_idUser1,_idUser2);
    const data = await Chats.create({
      chatname: name,
      users: _idUsers,
      chatType: { isGroup: true, admins: _idAdmin },
    });
    if (data) {
      return res.status(200).json({ msg: "Chat group created successfully" });
    }
    return res.status(400).json({ msg: "Failed to create chat group" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const { user, chat } = req.body;
    const _idChat = ObjectId(chat);
    const data = await Chats.findOne({ _id: _idChat });
    if (data.chatType.admins.length > 1)
      return res.status(403).json({ msg: "Too many admins" });
    await Messages.deleteMany({ chat: { belongsTo: _idChat } });
    await Chats.deleteOne({ _id: _idChat });
    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.addAdmin = async (req, res, next) => {
  try {
    const { user, candidate, chat } = req.body;
    const _idCandidate = ObjectId(candidate);
    const _idChat = ObjectId(chat);
    const data = await Chats.findOne({ _id: _idChat });
    if (data.chatType.admins.includes(_idCandidate))
      return res.status(200).json({ msg: "Already a admin" });
    await Chats.updateOne(
      { _id: _idChat },
      {
        chatType: {
          $push: { admins: _idCandidate },
        },
      }
    );
    return res.status(200).json({ msg: "Add as admin" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports.addUser = async (req, res, next) => {
  try {
    const { user, candidate, chat } = req.body;
    const _idCandidate = ObjectId(candidate);
    const _idChat = ObjectId(chat);
    const data = await Chats.findOne({ _id: _idChat });
    if (data.users.includes(_idCandidate))
      return res.status(200).json({ msg: "Already a member of group" });
    await Chats.updateOne(
      { _id: _idChat },
      {
        $push: { users: _idCandidate },
      }
    );
    return res.status(200).json({ msg: "Added to group" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports.exitUser = async (req, res, next) => {
  try {
    const { user, chat } = req.body;
    const _idUser = ObjectId(user._id);
    const _idChat = ObjectId(chat);
    const data = await Chats.findOne({ _id: _idChat });
    if (data.users.length === 1) {
      await Messages.deleteMany({ chat: { belongsTo: _idChat } });
      await Chats.deleteOne({ _id: _idChat });
      return res
        .status(200)
        .json({ msg: "Entire chat deleted as you were the last member." });
    } else {
      await Chats.updateOne(
        { _id: _idChat },
        {
          $pull: { users: _idUser },
        }
      );
      return res.status(200).json({ msg: "Removed from Group" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports.removeUser = async (req, res, next) => {
  try {
    const { user, candidate, chat } = req.body;
    const _idCandidate = ObjectId(candidate);
    const _idChat = ObjectId(chat);
    await Chats.updateOne(
      { _id: _idChat },
      {
        $pull: { users: _idCandidate },
      }
    );
    return res.status(200).json({ msg: "Removed from group" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
