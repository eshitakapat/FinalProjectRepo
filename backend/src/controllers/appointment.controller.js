import Appointment from "../models/Appointment.model.js";


// ============================
// PATIENT BOOK APPOINTMENT
// ============================
export const createAppointment = async (req, res) => {

  try {

    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({
        message: "Doctor, date and time are required"
      });
    }

    // Check if slot already booked for that doctor
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $ne: "cancelled" }
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This slot is already booked"
      });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time
    });

    res.status(201).json(appointment);

  } catch (error) {

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
      .populate("patient", "email");

    res.status(200).json(appointments);

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

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json(appointment);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};