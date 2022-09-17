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
      "http://192.168.29.62:3000",
      "http://localhost:3000",
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
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", async (socket) => {
  // console.log("connection successfully", socket.connected);
  socket.on("disconnect", () => {
    // console.log("disconnected");
  });
  // socket.on("user-online", (user) => {
  //   console.log("user joined chat : ", chat);
  //   socket.join(user);
  // });
  socket.on("join-chat", (chat) => {
    console.log("user joined chat : ", chat);
    socket.join(chat);
  });
  socket.on("new-message", (userMessage) => {
    console.log("new message : ", userMessage);
    socket.to(userMessage.chatid).emit("emit:new-message", userMessage);
  });
});
