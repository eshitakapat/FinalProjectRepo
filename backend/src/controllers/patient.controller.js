import Patient from "../models/Patient.model.js";
import generateToken from "../utils/generateToken.js";


// 🔹 REGISTER PATIENT
export const registerPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already exists",
      });
    }

    // Password hashing handled in schema pre("save")
    const patient = await Patient.create({
      email,
      password,
    });

    const token = generateToken(patient);

    res.status(201).json({
      token,
      user: {
        id: patient._id,
        email: patient.email,
        role: "patient",
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 LOGIN PATIENT
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await patient.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(patient);

    res.status(200).json({
      token,
      user: {
        id: patient._id,
        email: patient.email,
        role: "patient",
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};