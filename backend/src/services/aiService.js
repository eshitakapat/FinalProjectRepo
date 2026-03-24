import Groq from "groq-sdk";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
export const uploadMiddleware = upload.single("image");

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Data}`,
              },
            },
            {
              type: "text",
              text: `Analyze this skin image and respond ONLY in this exact JSON format, no extra text:
              {
                "disease": "condition name in 2-3 words",
                "confidence": 85,
                "intensity": "Mild/Moderate/Severe",
                "biomarkers": ["symptom 1", "symptom 2", "symptom 3"],
                "plan": "Brief treatment recommendation in one sentence."
              }`,
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const rawText = response.choices[0].message.content;

    // Parse JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    const result = JSON.parse(jsonMatch[0]);
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI analysis failed" });
  }
};