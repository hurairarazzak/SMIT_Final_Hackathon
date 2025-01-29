import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/auth.routes.js";  // Correct import for auth routes
import userRoute from "./routes/user.routes.js";
dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(
  cors({
    origin: ["https://smit-final-hackathon-kappa.vercel.app"], // Your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({extended:true}));
app.use("/api/v1/auth", authRoute); // Ensure /api/v1/auth is used for auth routes
app.use("/api/v1/user", userRoute);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  });