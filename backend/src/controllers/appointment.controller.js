import Appointment from "../models/Appointment.model.js";
const normalizeDoctor = (str) =>
  str.toLowerCase().replace(/dr\.?\s*/g, "").trim();

const normalizeTime = (t) =>
  t.replace(/^0/, "").trim();

const formatDate = (date) =>
  new Date(date).toISOString().split("T")[0];

// ============================
// PATIENT BOOK APPOINTMENT
// ============================
export const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;
    const formattedDate = formatDate(date);

    // ✅ VALIDATION
    if (!doctor || !date || !time) {
      return res.status(400).json({
        message: "Doctor, date and time are required"
      });
    }

    // ✅ DEBUG INPUT
    console.log("Incoming:", { doctor, date, time });

    // ✅ CHECK SLOT
    const existingAppointment = await Appointment.find({
       date: formattedDate,
       status: { $ne: "rejected" }
    });

    // 🧠 Check clash manually
const clash = existingAppointment.find(
  (a) =>
    normalizeDoctor(a.doctor) === normalizeDoctor(doctor) &&
    normalizeTime(a.time) === normalizeTime(time)
);

console.log("Incoming:", { doctor, time });

existingAppointment.forEach(a => {
  console.log("DB:", {
    doctor: a.doctor,
    time: a.time
  });
});

console.log("Appointments found:", existingAppointment.length);


if (clash) {
  return res.status(400).json({
    message: "This slot is already booked"
  });
}


    console.log("Before create");
    // ✅ CREATE
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date: formattedDate,
      time : normalizeTime(time)
    });

    // ✅ RETURN REAL DATA (THIS FIXES YOUR BUG)
    res.status(201).json({
      appointment
    });

     // 🔥 CRITICAL LOG
    console.log("Created appointment:", appointment);

  } catch (error) {
    console.error("CREATE ERROR:", error); // 🔥 don't hide it
    res.status(500).json({
      message: error.message
    });
  }
};


// ============================
// PATIENT VIEW THEIR APPOINTMENTS
// ============================
export const getPatientAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      patient: req.user._id
    });

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// ============================
// DOCTOR VIEW ALL APPOINTMENTS
// ============================
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment
      .find()
      .populate("patient", "email"); // keep email only (safe)

    res.status(200).json({
      appointments // ✅ IMPORTANT: wrapped in object
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// ============================
// DOCTOR UPDATE STATUS
// ============================

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ VALIDATION (very important)
    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      appointment // ✅ consistent response
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};