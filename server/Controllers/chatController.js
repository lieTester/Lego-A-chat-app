const Chats = require("../Models/chatsModel");
const { ObjectId } = require("mongodb");

module.exports.create = async (req, res, next) => {
  try {
    const { admin, users, group } = req.body;

    const _idAdmin = ObjectId(admin)
    const _idUsers = await users.map((user) => {
      return ObjectId(user);
    });
    // console.log(_idUsers,_idAdmin);
    const data = await Chats.create({
      users: _idUsers,
      chatType: { isGroup: group, admins: (group?_idAdmin:_idUsers) },
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
module.exports.adduser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};
module.exports.removeuser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.json({ error });
  }
};

// 630789cf31016d60ef944c1c puneet
// 630860d62c301b708e7fb879 adi
