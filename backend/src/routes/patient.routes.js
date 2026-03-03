import express from "express";
import {
  registerPatient,
  loginPatient,
} from "../controllers/patient.controller.js";
import { protectPatient } from "../middlewares/patientAuth.middleware.js";

const router = express.Router();


// 🔹 Public Routes
router.post("/register", registerPatient);
router.post("/login", loginPatient);


// 🔹 Protected Route (Patient only)
router.get("/me", protectPatient, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    role: "patient",
  });
});

export default router;