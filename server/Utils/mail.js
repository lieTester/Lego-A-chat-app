const nodemailer = require("nodemailer");
const { generateOTP } = require("./utilFunctions");

exports.mailit = (email) => {
  try {
    const OTP = generateOTP();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ID, // generated ethereal user
        pass: process.env.EMAIL_PW, // generated ethereal password
      },
    });
    const option = {
      from: process.env.EMAIL_ID, // sender address
      to: email,
      subject: "Verification OTP", // Subject line
      html: `<br/>Otp : ${OTP}`,
    };
    return { transporter, OTP, option };
  } catch (error) {
    return null;
  }
  // send mail with defined transport object
};
