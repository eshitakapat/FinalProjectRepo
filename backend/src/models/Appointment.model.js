import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  doctor: {
    type: String,
    required: true
  },

  date: {
    type: String,
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

export default mongoose.model("Appointment", appointmentSchema);