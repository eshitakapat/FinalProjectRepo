import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Doctor-only
router.get(
  "/doctor",
  protect,
  authorize(["doctor"]),
  (req, res) => {
    res.json({ message: "Doctor route accessed" });
  }
);

// Admin-only
router.get(
  "/admin",
  protect,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Admin route accessed" });
  }
);

export default router;
