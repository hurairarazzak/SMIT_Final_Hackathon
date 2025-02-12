import express from "express";
import Guarantor from "../models/Guarontor.model.js"; 
import { authorizationUser } from "../middlewares/authorization.js";

const router = express.Router();

// Guarantor form submit API
router.post("/add", authorizationUser, async (req, res) => {
  try {
    const { name, email, phone, relation } = req.body;
    const userId = req.user._id; // Logged-in user ka ID

    const newGuarantor = new Guarantor({ userId, name, email, phone, relation });
    await newGuarantor.save();

    res.status(201).json({ success: true, message: "Guarantor added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Logged-in user ke liye Guarantor details fetch karna
router.get("/my-guarantor", authorizationUser, async (req, res) => {
  try {
    console.log("User ID from request:", req.user._id); // Debugging
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const guarantor = await Guarantor.findOne({ userId });
    console.log("Guarantor found:", guarantor); // Debugging

    if (!guarantor) {
      return res.status(404).json({ success: false, message: "No Guarantor found" });
    }

    res.status(200).json({ success: true, data: guarantor });
  } catch (error) {
    console.error("Error in /my-guarantor route:", error); // Debugging
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;