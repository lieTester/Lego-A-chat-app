const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoute");

require("dotenv").config();

const app = express();

app.use(
   cors({
      origin: [
         // "Access-Control-Allow-Origin",
         process.env.FRONT_HOSTS,
      ],
      credentials: true,
   })
);
app.use(express.json());

// middleware cookiesparser
app.use(cookieParser());

// auth api part
app.use("/api/auth", userRoutes);

// chat data
app.use("/api/chat", chatRoutes);

// message data
app.use("/api/message", messageRoutes);

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("Mogodb working");
   })
   .catch((err) => {
      console.log(err.message);
   });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
   console.log(`On port ${port}`);
});

const io = require("socket.io")(server, {
   pingTimeout: 60000,
   cors: { origin: process.env.FRONT_HOSTS },
});

io.on("connection", async (socket) => {
   // console.log("connection successfully", socket.connected);
   socket.on("disconnect", (user) => {
      console.log("disconnected");
   });

   // use it to emit message to user currently online and we had a message for them from any one of its beonging chat
   socket.on("user-online", (user) => {
      // console.log("user-login : ", user);
      socket.join(user);
   });
   // use it to emit message to user-loginout
   socket.on("user-offline", (user) => {
      // console.log("user-logout : ", user);
      socket.leave(user);
   });

   // this will use to send for typing signal to user currently in particular chat
   socket.on("join-chat", (chat) => {
      // console.log("user joined chat : ", chat);
      socket.join(chat);
   });

   // on recieve message from user currently active and send others related to it who are online
   socket.on("new-message", (chatData) => {
      // console.log("new message ");
      chatData.users.forEach((user) => {
         if (user === chatData.sender._id) return;
         // console.log(user);
         socket.in(user).emit("emit:new-message", {
            time: chatData.time,
            text: chatData.text,
            chatId: chatData.chatId,
            messageId: chatData.messageId,
            name: chatData.sender.username,
         });
      });
   });
});
