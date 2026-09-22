import express from "express";
import cors from "cors";

// Router Imports
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ======================
// 🔹 CORS Configuration
// ======================
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL, // e.g., https://careflow-frontend.vercel.app
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to allow Vercel preview URLs dynamically
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ======================
// 🔹 Body Parsing Middleware
// ======================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ======================
// 🔹 API Route Binding
// ======================
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/ai", aiRoutes);

// ======================
// 🔹 Health Check Endpoint
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "CareFlow AI Health API Service Running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "CareFlow Backend API Gateway Active",
  });
});

// ======================
// 🔹 Global 404 Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found on CareFlow API Server`,
  });
});

// ======================
// 🔹 Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error("🔥 Internal Express Application Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

export default app;