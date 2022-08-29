const {getMessages,addMessage } = require("../Controllers/messageController");
const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getMessages", getMessages);

module.exports = router;
