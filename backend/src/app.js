import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import protectedRoutes from "./routes/protected.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/protected", protectedRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;


