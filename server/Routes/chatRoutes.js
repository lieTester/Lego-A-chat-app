const {
  createChat,
  fetchChats,
  createGroup,
  deleteGroup,
  addAdmin,
  exitUser,
  addUser,
  removeUser,
} = require("../Controllers/chatController");
const router = require("express").Router();
const { accessTokenVerification } = require("../Middleware/authMiddleware");

router.post("/", accessTokenVerification, createChat);
router.get("/", accessTokenVerification, fetchChats);
router.get("/group/create", createGroup);
router.get("/group/delete", deleteGroup);
router.post("/group/add-admin", addAdmin);
router.post("/group/exit", exitUser); // want to exit from group
router.post("/group/add-user", addUser); // remove by admin forcefully
router.post("/group/remove-user", removeUser); // remove by admin forcefully

module.exports = router;
