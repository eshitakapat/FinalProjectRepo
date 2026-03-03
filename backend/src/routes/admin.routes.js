import express from "express";
import { loginAdmin } from "../controllers/doctorAdmin.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.middleware.js";

const router = express.Router();

// 🔹 Public Route
router.post("/login", loginAdmin);

// 🔹 Protected Route (Admin only)
router.get("/me", protectAdmin, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    role: "admin",
  });
});

export default router;