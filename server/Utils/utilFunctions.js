const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createCanvas } = require("canvas");
// time string genaratior
exports.getDate = (date) => {
  let todaysDate = new Date();
  let curr = todaysDate.getDate();
  if (date.getDate() === todaysDate.getDate()) return "today";
  todaysDate.setDate(curr - 1);
  if (date.getDate() === todaysDate.getDate()) return "yesterday";
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
exports.getTime = (date) => {
  let hour = date.getHours() % 12 || 12;
  let minute = date.getMinutes() % 60 || 0;
  let isAm = date.getHours() < 12 ? "am" : "pm";
  return `${(hour < 10 ? "0" : "") + hour}:${
    (minute < 10 ? "0" : "") + minute
  } ${isAm}`;
};

// get days method
exports.getExpiry = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

// OTP genarator method
exports.generateOTP = () => {
  return Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
};

// Access token generation method for 2USECASE: 1(while verify useror forgot password),2(login user)
exports.generateToken = (data, key, timeout) => {
  // console.log(data,key,timeout);
  return jwt.sign({ data }, key, {
    expiresIn: timeout,
  });
};
exports.verifyToken = (data, key) => {
  return jwt.verify(data, key);
};

exports.encrypter = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
exports.decrypter = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  // console.log(result);
  return result;
};

exports.makeAvatar = async (name) => {
  const colorGenerator = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  const canvas = createCanvas();
  const context = canvas.getContext("2d");

  canvas.width = 200;
  canvas.height = 200;

  // Draw background
  context.fillStyle = colorGenerator();
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px Impact";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  let letters;
  const nameParts = name.split(" ");
  if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
    letters = nameParts[0][0] + nameParts[nameParts.length - 1][0];
  } else {
    letters = nameParts[0][0] + nameParts[0][1];
  }
  // console.log(nameParts, letters);
  context.fillText(letters, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
};
