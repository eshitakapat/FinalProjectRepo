"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Users, Clock, Clipboard, Activity,
  ChevronRight
} from "lucide-react";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/appointments/doctor", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      const list = Array.isArray(data) ? data : data.appointments;

      setAppointments(list || []);

    } catch (err) {
      console.error(err);
    }
  };

  fetchAppointments();
}, []);
  // ✅ CALCULATED STATS (REAL)
  const total = appointments?.length || 0;
const pending = appointments?.filter(a => a.status === "pending")?.length || 0;
const approved = appointments?.filter(a => a.status === "approved")?.length || 0;
const completed = appointments?.filter(a => a.status === "completed")?.length || 0;
  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      // 🔁 REFRESH
      setAppointments(prev =>
        prev.map(a => a._id === id ? { ...a, status } : a)
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-20">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">Total: {total}</Card>
        <Card className="p-4">Pending: {pending}</Card>
        <Card className="p-4">Approved: {approved}</Card>
        <Card className="p-4">Completed: {completed}</Card>
      </div>

      {/* APPOINTMENTS LIST */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          appointments.map((appt) => (
            <Card key={appt._id} className="p-4 flex justify-between items-center">

              <div>
                <p><b>Patient:</b> {appt.patient?.email}</p>
                <p><b>Doctor:</b> {appt.doctor}</p>
                <p><b>Date:</b> {appt.date}</p>
                <p><b>Time:</b> {appt.time}</p>
                <p><b>Status:</b> {appt.status}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => updateStatus(appt._id, "approved")}>
                  Approve
                </Button>

                <Button onClick={() => updateStatus(appt._id, "rejected")}>
                  Reject
                </Button>

                <Button onClick={() => updateStatus(appt._id, "completed")}>
                  Complete
                </Button>
              </div>

            </Card>
          ))
        )}
      </div>

    </div>
  );
}