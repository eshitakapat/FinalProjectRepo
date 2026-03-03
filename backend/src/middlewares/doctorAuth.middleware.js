import jwt from "jsonwebtoken";

export const protectDoctor = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      return res.status(403).json({ message: "Access denied. Doctor only." });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};