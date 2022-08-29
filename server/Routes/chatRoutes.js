const {
  create,
  adduser,
  removeuser,
} = require("../Controllers/chatController");
const router = require("express").Router();

router.post("/", create);
// router.get("/", fetch);
// router.get("/remove", remove);
// router.get("/group/create", createGroup);
// router.get("/group/delete", deleteGroup);
// router.post("/group/add", addAdmin);
// router.post("/group/exit", exitUser); // want to exit from group
// router.post("/group/remove", removeUser); // remove by admin forcefully

module.exports = router;
