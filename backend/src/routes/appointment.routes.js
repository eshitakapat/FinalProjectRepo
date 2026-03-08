import express from "express";

import {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} from "../controllers/appointment.controller.js";

import { protectPatient } from "../middlewares/patientAuth.middleware.js";
import { protectDoctor } from "../middlewares/doctorAuth.middleware.js";

const router = express.Router();


// PATIENT BOOK APPOINTMENT
router.post("/create", protectPatient, createAppointment);


// PATIENT VIEW THEIR APPOINTMENTS
router.get("/my", protectPatient, getPatientAppointments);


// DOCTOR VIEW ALL APPOINTMENTS
router.get("/doctor", protectDoctor, getDoctorAppointments);


// DOCTOR UPDATE STATUS
router.patch("/:id/status", protectDoctor, updateAppointmentStatus);

export default router;