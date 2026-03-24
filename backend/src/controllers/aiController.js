import { analyzeImage } from "../services/aiService.js";

export const analyzeSkin = (req, res) => {
  return analyzeImage(req, res);
};