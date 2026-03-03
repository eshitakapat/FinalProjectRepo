import express from "express";
import { loginDoctor } from "../controllers/doctorAdmin.controller.js";
import { protectDoctor } from "../middlewares/doctorAuth.middleware.js";

const router = express.Router();

// 🔹 Public Route
router.post("/login", loginDoctor);

// 🔹 Protected Route (Doctor only)
router.get("/me", protectDoctor, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    role: "doctor",
  });
});

export default router;