import express from "express";
import multer from "multer";
import { analyzeImage } from "../controllers/analyze.controller.js";

const router = express.Router();

// ✅ use memory storage (better than saving files)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ SINGLE correct route
router.post("/", upload.single("image"), analyzeImage);

export default router;