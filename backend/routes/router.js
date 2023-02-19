const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending email with react & nodeJs",
      html: "<h1>Congratulations</h1><h1>You successfully sent email</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`ERROR : ${error}`);
      } else {
        console.log(`EMAIL SEND : ${info.response}`);

        return res.status(201).json({ status: 201, info });
      }
    });
  } catch (err) {
    console.log(`backend error : ${err}`);
    return res.status(401).json({ status: 401, err });
  }
});

module.exports = router;
