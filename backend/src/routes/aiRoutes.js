import express from "express";
import { analyzeSkin } from "../controllers/aiController.js";
import { uploadMiddleware } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", uploadMiddleware, analyzeSkin); // ✅

export default router;