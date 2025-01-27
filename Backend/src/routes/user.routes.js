import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import User from "../models/User.model.js";
import { authorizationUser } from "../middlewares/authorization.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/get-my-info", authorizationUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendResponse(res, 404, null, true, "User not found");
    sendResponse(res, 200, user, false, "User fetched successfully");
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, null, true, "Internal server error");
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { senderName, sender, receiver, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    const sendEmail = async (senderName, sender, receiver, subject, message) => {
      try {
        const info = await transporter.sendMail({
          from: `${senderName} <${sender}>`,
          to: receiver,
          subject: subject,
          text: message,
          html: message,
        });
        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.error(error);
      }
    };

    await sendEmail(senderName, sender, receiver, subject, message);
    res.status(200).json({ error: false, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

export default router;
