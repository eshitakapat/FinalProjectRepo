import jwt from "jsonwebtoken";
import Patient from "../models/Patient.model.js";

export const protectPatient = async (req, res, next) => {
  try {
    // 1️⃣ Check header exists
    if (!req.headers.authorization || 
        !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2️⃣ Extract token
    const token = req.headers.authorization.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find patient
    const patient = await Patient.findById(decoded.id).select("-password");

    if (!patient) {
      return res.status(401).json({ message: "Patient not found" });
    }

    // 5️⃣ Attach to request
    req.user = patient;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};