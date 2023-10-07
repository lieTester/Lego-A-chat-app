// models used
const Users = require("../Models/usersModel");
const UserVerification = require("../Models/verificationModel");

// utility functions
const {
   generateToken,
   decrypter,
   getExpiry,
   makeAvatar,
} = require("../Utils/utilFunctions");
const { mailit } = require("../Utils/mail");

// verify email for registration as well as forgot password verification
module.exports.verifyOTP = async (req, res, next) => {
   try {
      const { user, OTP, newpassword } = req.body;

      if (user.otp === OTP) {
         await Users.updateOne(
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
         if (newpassword !== undefined && newpassword !== "") {
            await Users.updateOne(
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
      return res.status(400).json({ msg: "Bad request!" });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
   }
};

// register user
module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password, profile } = req.body;
      const emailCheck = await Users.findOne({ email: email });
      if (emailCheck) {
         return res
            .status(302)
            .json({ msg: "Email already exists", status: false });
      }

      // send mail with defined transport object
      const { transporter, OTP, option } = mailit(email);
      await transporter.sendMail(option);

      const user = await Users.create({
         email: email,
         username: username,
         password: password,
         profile: await makeAvatar(username),
      });

      const token = await UserVerification.create({
         user: user._id,
         otp: OTP,
      });

      return res.status(200).send({
         msg: "Success!",
         status: true,
         token: generateToken(
            [token._id, user._id],
            process.env.ACCESS_SECRET_KEY,
            "5m"
         ),
      });
   } catch (error) {
      console.error(error);
      return res
         .status(500)
         .send({ msg: "Registeration not sucessfull", error: error.message });
   }
};

// forgot password
module.exports.forgotPassword = async (req, res, next) => {
   try {
      const { email } = req.body;
      const user = await Users.findOne({ email: email });
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
         token: generateToken(
            [token._id, user._id],
            process.env.ACCESS_SECRET_KEY,
            "5m"
         ),
      });
   } catch (error) {
      return res.status(500).send({ error: error.message });
   }
};

// login user
module.exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const foundUser = await Users.findOne({ email: email });
      if (!foundUser) {
         return res.status(404).send({ msg: "User not found", status: false });
      }
      const fail =
         !(await decrypter(password, foundUser.password)) ||
         foundUser.isVerified === false;
      if (fail) {
         return res
            .status(400)
            .send({
               msg: "Email or Password incorrect or User not verified yet",
            });
      }
      // console.log(foundUser);
      const accessToken = generateToken(
         foundUser._id,
         process.env.ACCESS_SECRET_KEY,
         // chnge 1d > 1m after work completed on api
         "5m"
      );
      const refreshToken = generateToken(
         { "jwt-token": "refreshToken" },
         process.env.REFRESH_SECRET_KEY,
         "22d"
      );

      await Users.updateOne(
         { _id: foundUser._id },
         {
            $set: {
               refreshToken: refreshToken,
            },
         }
      );

      res.cookie("SESSION_ID", refreshToken, {
         httpOnly: true,
         secure: true, // with secure we cannot work at localhost
         maxAge: getExpiry(22),
      });
      return res.status(200).json({
         msg: "Login successfull",
         token: accessToken,
         username: foundUser.username,
         id: foundUser._id,
         profile: foundUser.profile,
      });
   } catch (error) {
      return res.status(500).json({ msg: "server error", error: error.stack });
   }
};
// logout user
module.exports.logout = async (req, res, next) => {
   try {
      const cookie = req.cookies;
      if (!cookie?.SESSION_ID) {
         return res.status(204).send({ msg: "Logout sucessfull" }); //no content in cookie
      }
      const SESSION_ID = cookie.SESSION_ID;

      await Users.findOneAndUpdate(
         {
            refreshToken: SESSION_ID,
         },
         { $set: { refreshToken: "" } }
      );
      res.clearCookie("SESSION_ID", { httpOnly: true });
      return res.status(204).send({ msg: "Logout sucessfull" });
   } catch (error) {
      console.error(error.message);
      return res
         .status(500)
         .json({ msg: "server error", error: error.message });
   }
};
// add user profile image
module.exports.profile = async (req, res, next) => {
   try {
      const { user, avatar } = req.body;

      const profile = await Users.findOneAndUpdate(
         {
            _id: user._id,
         },
         { $set: { profile: avatar } }
      );
      if (profile)
         return res.status(200).send({ msg: "profile update success" });

      return res
         .status(400)
         .json({ msg: "someting went wrong", error: error.message });
   } catch (error) {
      console.error(error.message);
      return res
         .status(500)
         .json({ msg: "server error", error: error.message });
   }
};

// accessToken time check routr
module.exports.accessTokenTest = async (req, res, next) => {
   return res.status(200).json({ msg: "accessToken: working" });
};
