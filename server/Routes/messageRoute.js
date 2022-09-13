const {getMessages,addMessage } = require("../Controllers/messageController");
const router = require("express").Router();
const{ accessTokenVerification,
} = require("../Middleware/authMiddleware");


router.post("/addMessage",accessTokenVerification, addMessage);
router.post("/getMessages",accessTokenVerification, getMessages);

module.exports = router;
