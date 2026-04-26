import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});