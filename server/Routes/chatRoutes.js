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


// insted of puttin accessTokenVerification middleware here to all chat routes
// we would put index.js before chatRoute like this
// app.use("/api/chat", accessTokenVerification, chatRoutes);
router.post("/", accessTokenVerification, createChat);
router.get("/", accessTokenVerification, fetchChats);
router.post("/group/create",accessTokenVerification, createGroup);
router.post("/group/delete",accessTokenVerification, deleteGroup);
router.post("/group/add-admin",accessTokenVerification, addAdmin);
router.post("/group/exit",accessTokenVerification, exitUser); // want to exit from group
router.post("/group/add-user",accessTokenVerification, addUser); // remove by admin forcefully
router.post("/group/remove-user",accessTokenVerification, removeUser); // remove by admin forcefully

module.exports = router;
