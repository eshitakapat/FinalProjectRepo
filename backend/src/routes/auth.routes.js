import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;