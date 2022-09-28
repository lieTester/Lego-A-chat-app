const Users = require("../Models/usersModel");

// route chats
module.exports.userSearch = async (req, res, next) => {
  try {
    const { user, userSearch } = req.body;
    console.log(userSearch);
    const search = {
      $or: [
        { username: { $regex: userSearch, $options: "i" } },
        { email: { $regex: userSearch, $options: "i" } },
      ],
    };

    const userMatchs = await Users.find(search)
      .find({ _id: { $ne: user._id } })
      .limit(15);
    let users = userMatchs.map((match) => {
      return { name: match.username, profile: match.profile, id: match._id };
    });
    return res.status(200).json({ msg: "users search filter result", users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// route chats
module.exports.fetchUsers = async (req, res, next) => {
  try {
    const { user } = req.body;


    const userMatchs = await Users.findOne(
      {
        _id: user._id,
      },
      { contacts: 1 }
    ).populate("contacts");

    let users = userMatchs.contacts.map((match) => {
      return {
        name: match.username,
        profile: match.profile,
        id: match._id,
      };
    });
    return res.status(200).json({ msg: "users search filter result", users });
  } catch (error) {
    return res.status(500).json({ msg: error.message ,d:"sd"});
  }
};
