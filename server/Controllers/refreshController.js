// database models
const User = require("../Models/usersModel");

// utility functions
const { verifyToken, generateToken } = require("../Utils/utilFunctions");

module.exports.refreshTokenVerification = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.SESSION_ID) return res.sendStatus(403);

  try {
    const foundUser = await User.findOne({ refreshToken: cookies.SESSION_ID });
    if (!foundUser) return res.status(404).json({ msg: "User not found" });

    const acceptable = verifyToken(
      cookies.SESSION_ID,
      process.env.REFRESH_SECRET_KEY
    );
    if (!acceptable) return res.status(403).json({ msg: "Invalid token" });

    const accessToken = generateToken(
      foundUser._id,
      process.env.ACCESS_SECRET_KEY,
      "1m"
    );

    return res.status(200).json({
      token: accessToken,
      username: foundUser.username,
      id: foundUser._id,
      profile: foundUser.profile,
    });
  } catch (error) {
    res.status(500).json({ msg: "unidentified error", error: error.stack });
  }
};
