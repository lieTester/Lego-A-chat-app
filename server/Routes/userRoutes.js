const router = require("express").Router();

const {
  register,
  login,
  verifyOTP,
  logout,
  forgotPassword,
  accessTokenTest,
  profile,
} = require("../Controllers/userControllers");

const {
  accessTokenVerification,
  OTPVerification,
} = require("../Middleware/authMiddleware");

const {
  refreshTokenVerification,
} = require("../Controllers/refreshController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.get("/logout", logout);
router.get("/refresh-token", refreshTokenVerification);
router.post("/verify-OTP", OTPVerification, verifyOTP);
router.post("/profile", accessTokenVerification, profile);
router.get("/test", accessTokenVerification, accessTokenTest);

module.exports = router;
