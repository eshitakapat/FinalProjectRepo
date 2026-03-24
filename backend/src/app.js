import express from "express";
import cors from "cors";

import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();


// ======================
// 🔹 Middlewares
// ======================
app.use(cors());
app.use(express.json({ limit: "10mb" }));


// ======================
// 🔹 Routes
// ======================
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/ai", aiRoutes);


// ======================
// 🔹 Health Check
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running...",
  });
});


// ======================
// 🔹 404 Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;