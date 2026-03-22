export const analyzeImage = async (req, res) => {
  try {
    // later replace with real AI
    res.status(200).json({
      disease: "Acne",
      intensity: "Mild",
      confidence: 87,
      biomarkers: ["Inflammation", "Redness"],
      plan: "Use salicylic acid cleanser and avoid oily products."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};