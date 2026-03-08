import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending"
  }

},
{ timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;