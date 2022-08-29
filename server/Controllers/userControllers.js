// models used
const User = require("../Models/usersModel");
const UserVerification = require("../Models/verificationModel");

// utility functions
const {
  generateToken,
  decrypter,
  getExpiry,
} = require("../Utils/utilFunctions");
const { mailit } = require("../Utils/mail");

// verify email for registration as well as forgot password verification
module.exports.verifyOTP = async (req, res, next) => {
  try {
    const { user, OTP, newpassword } = req.body;

    if (user.otp === OTP) {
      await User.updateOne(
        { _id: user.user },
        {
          $set: {
            isVerified: true,
          },
        }
      );
      // this newpassword is for verifiy for forgot password but also :
      // its about if user loged in but never verified before so data is still with us
      // and because its unverified use not able to log in ultimately they use forgot password
      // in that case verification and password change both work at same time
      if (newpassword !== undefined) {
        await User.updateOne(
          { _id: user.user },
          {
            $set: {
              password: newpassword,
            },
          }
        );
      }

      await UserVerification.deleteOne({ _id: user._id });
      // console.log(token, del, _iduser);
      return res.status(200).json({ msg: "User verified success!" });
    }
    return res.status(400).json({ msg: "something went wrong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

// register user
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "User already present", status: false });
    }

    // send mail with defined transport object
    const { transporter, OTP, option } = mailit(email);
    // await transporter.sendMail(option);

    const user = await User.create({
      email,
      username,
      password,
    });

    const token = await UserVerification.create({
      user: user._id,
      otp: OTP,
    });

    return res.status(200).send({
      msg: "Success!",
      status: true,
      id: generateToken(token._id, process.env.ACCESS_SECRET_KEY, "5m"),
    });
  } catch (error) {
    return res.status(400).send({ msg: "Registeration not sucessfull", error });
  }
};

// forgot password
module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ msg: "User not present in system", status: false });
    }

    const { transporter, OTP, option } = mailit(email);
    await transporter.sendMail(option);

    const token = await UserVerification.create({
      user: user._id,
      otp: OTP,
    });

    res.status(200).send({
      msg: "Mail send check",
      status: true,
      id: generateToken(token._id, process.env.ACCESS_SECRET_KEY, "5m"),
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

// login user
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).send({ msg: "User not found", status: false });
    }
    const fail =
      !(await decrypter(password, foundUser.password)) ||
      foundUser.isVerified === false;
    if (fail) {
      return res
        .status(400)
        .send({ msg: "Email or Password incorrect or User not verified yet" });
    }
    // console.log(foundUser);
    const accessToken = generateToken(
      foundUser._id,
      process.env.ACCESS_SECRET_KEY,
      "1m"
    );
    const refreshToken = generateToken(
      { "jwt-token": "refreshToken" },
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
      // secure: true,// with secure we cannot work at localhost
      maxAge: getExpiry(22),
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    return res.status(500).json({ msg: "server error", error: error.stack });
  }
};



// accessToken time check routr
module.exports.accessTokenTest = async (req, res, next) => {
  return res.status(200).json({msg:"accessToken: working"})
}