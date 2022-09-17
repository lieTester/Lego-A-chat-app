const {getMessages,addMessage } = require("../Controllers/messageController");
const router = require("express").Router();
const{ accessTokenVerification,
} = require("../Middleware/authMiddleware");


router.post("/",accessTokenVerification, addMessage);
router.post("/get-messages",accessTokenVerification, getMessages);

module.exports = router;
