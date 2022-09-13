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
      "Access-Control-Allow-Origin",
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

const server = app.listen(process.env.PORT, () => {
  console.log(`On port ${process.env.PORT}`);
});
