// database models
const User = require("../Models/usersModel");

// utility functions
const {
  verifyToken,
  generateToken,
  getExpiry,
} = require("../Utils/utilFunctions");

module.exports.refreshTokenVerification = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.SESSION_ID) return res.status(403);

  try {
    const foundUser = await User.findOne({ refreshToken: cookies.SESSION_ID });
    if (!foundUser) return res.status(404).json({ msg: "User not found" });

    const acceptable = verifyToken(cookies.SESSION_ID, process.env.REFRESH_SECRET_KEY);
    if (!acceptable) return res.status(403).json({ msg: "Invalid token" });

    // console.log(foundUser._id, process.env.REFRESH_SECRET_KEY);
    const accessToken = generateToken(
      foundUser._id,
      process.env.ACCESS_SECRET_KEY,
      "1m"
    );
    const refreshToken = generateToken(
      { "SESSION_ID-token": "refreshToken" },
      process.env.REFRESH_SECRET_KEY,
      "22d"
    );
    await User.updateOne(
      { _id: foundUser._id },
      {
        $set: {
          refreshToken: refreshToken,
        },
      }
    );
    res.cookie("SESSION_ID", refreshToken, {
      httpOnly: true,
      // secure: true, // with secure we cannot work at localhost
      maxAge: getExpiry(22),
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ msg: "unidentified error", error: error.stack });
  }
};
