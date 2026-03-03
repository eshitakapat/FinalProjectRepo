import express from "express";
import cors from "cors";

import patientRoutes from "./routes/patient.routes.js";
// (Later you can add doctorRoutes, adminRoutes the same way)

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patient", patientRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;