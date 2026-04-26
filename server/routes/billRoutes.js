import express from "express";
import { createBill, getBills, deleteBill } from "../controllers/billController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBill);
router.get("/", authMiddleware, getBills);
router.delete("/:id", authMiddleware, deleteBill); // 🔥 ADD THIS

export default router;