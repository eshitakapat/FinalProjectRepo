import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

router.post("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default router;
