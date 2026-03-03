import generateToken from "../utils/generateToken.js";


// ======================
// 🔹 LOGIN DOCTOR
// ======================
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.DOCTOR_EMAIL ||
      password !== process.env.DOCTOR_PASSWORD
    ) {
      return res.status(400).json({
        message: "Invalid doctor credentials",
      });
    }

    const doctorData = {
      email,
      role: "doctor",
    };

    const token = generateToken(doctorData);

    res.status(200).json({
      token,
      user: doctorData,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ======================
// 🔹 LOGIN ADMIN
// ======================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        message: "Invalid admin credentials",
      });
    }

    const adminData = {
      email,
      role: "admin",
    };

    const token = generateToken(adminData);

    res.status(200).json({
      token,
      user: adminData,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};