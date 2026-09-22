"use client";

import { useState, useEffect } from "react";
import type { MouseEventHandler, ReactNode } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  User,
  FileText,
  Activity,
  ArrowRight,
  Stethoscope,
  X,
  GraduationCap
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  type: string;
  role: string;
  bio: string;
  education: string;
}

interface Appointment {
  _id?: string;
  doctor: string;
  time: string;
  date: string;
}

interface SymptomLog {
  doc: string;
  note: string;
  severity: number;
  date: string;
}

interface SymptomData {
  doctor: string;
  severity: number;
  notes: string;
  date: string;
}

interface BookingData {
  doctor: string;
  time: string;
  date: string;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "primary" | "outline" | "dark";
  disabled?: boolean;
}

/* ---------------- DATASET ---------------- */

const doctorsList = [
  { 
    id: "as-1", 
    name: "Dr. Ananya Sharma", 
    type: "In-Person", 
    role: "Senior Dermatologist",
    bio: "Specialist in cosmetic dermatology and laser treatments with over 12 years of clinical experience.",
    education: "MD - AIIMS Delhi"
  },
  { 
    id: "mv-2", 
    name: "Dr. Marcus Vane", 
    type: "Video", 
    role: "Clinical Pathologist",
    bio: "Focused on diagnostic accuracy and skin biopsy analysis. Expert in identifying rare inflammatory conditions.",
    education: "Johns Hopkins University"
  },
  { 
    id: "sp-3", 
    name: "Dr. Sarah Paul", 
    type: "In-Person", 
    role: "Pediatric Dermatologist",
    bio: "Dedicated to treating skin conditions in children and adolescents with a gentle, patient-first approach.",
    education: "King's College London"
  },
  { 
    id: "jw-4", 
    name: "Dr. James Wilson", 
    type: "Video", 
    role: "Aesthetic Consultant",
    bio: "Expert in non-invasive skin rejuvenation, chemical peels, and personalized skincare regimens.",
    education: "Stanford Medicine"
  }
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

/* ---------------- REUSABLE BUTTON ---------------- */

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }: ButtonProps) => {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
    outline: "border-2 border-slate-100 text-slate-600 hover:bg-slate-50",
    dark: "bg-slate-900 text-white hover:bg-slate-800"
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 font-black uppercase text-[10px] tracking-widest italic ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/* ================= MAIN DASHBOARD ================= */

export default function UltimatePatientDashboard() {
  const [activeView, setActiveView] = useState("schedule");
  const [isBooking, setIsBooking] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([
    { doc: "Dr. Ananya Sharma", note: "Mild redness on cheeks", severity: 3, date: "Mar 08" },
    { doc: "Dr. Marcus Vane", note: "Dryness improved after lotion", severity: 1, date: "Mar 05" }
  ]);

  const [symptomData, setSymptomData] = useState<SymptomData>({
    doctor: "",
    severity: 5,
    notes: "",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  });

  const [bookingData, setBookingData] = useState<BookingData>({
    doctor: "",
    time: "",
    date: "Feb 12, 2026"
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/appointments/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const list: Appointment[] = Array.isArray(data) ? data : (data.appointments || []);

const cleaned = list.filter(
  (a: Appointment) => a.doctor && a.time && a.date
);

setAppointments(cleaned);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchAppointments();
  }, []);

  const normalize = (str: string) =>
  (str || "").toLowerCase().replace("dr. ", "").trim();

  const isSlotBooked = (time: string) => {
    return appointments.some(
      (a) => a.time === time && a.date === bookingData.date && normalize(a.doctor) === normalize(bookingData.doctor)
    );
  };

 
  const createAppointment = async () => {
    if (!bookingData.time || !bookingData.doctor.trim()) {
  alert("Doctor and time are required");
  return;
}
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(bookingData)
      });

       if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API ERROR:", errorText);
      return;
    }

      const text = await res.text();
    console.log("RAW RESPONSE:", text);
      const data = text ? JSON.parse(text) : {};
      console.log("PARSED DATA:", data);
      const newAppt = data.appointment;

if (!newAppt || !newAppt.doctor || !newAppt.time || !newAppt.date) {
  console.error("Invalid appointment blocked:", newAppt);
  return;
}


setAppointments(prev => [...prev, newAppt]);
      setStep(3);
    } catch (err) { console.error(err); }
  };

  const handleSaveSymptom = () => {
    if (!symptomData.doctor || !symptomData.notes) return alert("Please select a doctor and add notes");
    const newLog = { doc: symptomData.doctor, note: symptomData.notes, severity: symptomData.severity, date: symptomData.date };
    setSymptomLogs([newLog, ...symptomLogs]);
    setLogSuccess(true);
    setTimeout(() => {
      setIsLogging(false);
      setLogSuccess(false);
      setSymptomData({ doctor: "", severity: 5, notes: "", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
    }, 1500);
  };

  // FIXED INITIALS LOGIC
  const getInitial = (name: string) => {
    if (!name || typeof name !== 'string') return "D";
    const cleanName = name.replace("Dr. ", "").trim();
    return cleanName.charAt(0).toUpperCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="fixed inset-0 -z-20 w-full h-full bg-slate-50" />
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50/60 backdrop-blur-md" />

      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-white/80 backdrop-blur-xl border-r border-slate-100 p-10 flex flex-col gap-12 relative z-20">
        <h2 className="text-3xl font-black italic text-indigo-600 flex items-center gap-2 tracking-tighter uppercase">
          <Sparkles className="fill-indigo-600" /> CareFlow
        </h2>
        <nav className="flex flex-col gap-4">
          {[
            { id: "schedule", label: "Schedule", icon: <CalendarDays size={20} /> },
            { id: "doctors", label: "Specialists", icon: <User size={20} /> },
            { id: "records", label: "Prescriptions", icon: <FileText size={20} /> },
            { id: "tracker", label: "Symptom Log", icon: <Activity size={20} /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-4 px-6 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all italic
              ${activeView === item.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105" : "text-slate-400 hover:bg-indigo-50/50"}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-14 overflow-y-auto relative z-10">
        
        {/* VIEW: SCHEDULE */}
        {activeView === "schedule" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex justify-between items-end mb-16">
              <div>
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3 italic">Overview</p>
                <h1 className="text-6xl font-black italic text-slate-900 tracking-tighter uppercase">My <span className="text-indigo-600">Schedule</span></h1>
              </div>
              <Button onClick={() => { setStep(1); setIsBooking(true); }} className="h-16 px-12 rounded-full">New Booking</Button>
            </div>
            <div className="grid gap-6">
              {appointments.length === 0 ? (
                <div className="py-32 bg-white/40 rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
                   <p className="font-black italic uppercase tracking-widest text-xs">No Upcoming Visits</p>
                </div>
              ) : (
                appointments.map((appt: Appointment, idx: number) => (
                  <div key={appt._id || idx} className="bg-white/90 backdrop-blur-md p-10 rounded-[3.5rem] shadow-sm border border-white flex justify-between items-center group hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-8">
                       <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center font-black text-2xl text-indigo-600 italic">
                         {getInitial(appt.doctor)}
                       </div>
                       <div>
                         <h3 className="text-2xl font-black italic text-slate-900 uppercase tracking-tighter">{appt.doctor ? appt.doctor : "⚠️ Missing Doctor"}</h3>
                         <div className="flex gap-4 mt-3">
                           <span className="flex gap-2 items-center text-[10px] font-black uppercase text-slate-500 bg-slate-100/50 px-4 py-2 rounded-full italic"><Calendar size={12}/> {appt.date}</span>
                           <span className="flex gap-2 items-center text-[10px] font-black uppercase text-slate-500 bg-slate-100/50 px-4 py-2 rounded-full italic"><Clock size={12}/> {appt.time}</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
  <span
    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest
    ${
      appt.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : appt.status === "approved"
        ? "bg-green-100 text-green-700"
        : appt.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {appt.status || "pending"}
  </span>

  {appt.status === "approved"}
</div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW: SPECIALISTS */}
        {activeView === "doctors" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-6xl font-black italic text-slate-900 tracking-tighter uppercase mb-16">The <span className="text-indigo-600">Experts</span></h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {doctorsList.map((doc) => (
                <div key={doc.id} className="bg-white/90 p-12 rounded-[4.5rem] border border-white shadow-sm flex flex-col items-start group relative">
                  <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] mb-8 flex items-center justify-center text-indigo-600 font-black italic text-4xl">
                    {getInitial(doc.name)}
                  </div>
                  
                  <h3 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter">{doc.name}</h3>
                  <p className="text-[11px] font-black uppercase text-indigo-600 mt-1 tracking-[0.2em] italic mb-6">{doc.role}</p>
                  
                  <p className="text-slate-500 font-bold italic text-sm leading-relaxed mb-8">
                    {doc.bio}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 italic mb-10">
                    <GraduationCap size={16} className="text-slate-300" /> {doc.education}
                  </div>

                  <Button 
                    onClick={() => { setBookingData(prev => ({
  ...prev,
  doctor: doc.name
})); setStep(2); setIsBooking(true); }} 
                    className="w-full rounded-[2rem] h-16"
                  >
                    Schedule Session
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW: PRESCRIPTIONS */}
        {activeView === "records" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-6xl font-black italic text-slate-900 tracking-tighter uppercase mb-16">Vault <span className="text-indigo-600">Files</span></h1>
            <div className="grid gap-4">
              {[
                { id: "f1", title: "Treatment Plan - Acne v2", date: "Mar 05, 2026", size: "1.2 MB" },
                { id: "f2", title: "Biopsy Results - Final", date: "Feb 28, 2026", size: "450 KB" }
              ].map((file) => (
                <div key={file.id} className="bg-white/80 p-8 rounded-[3rem] flex items-center justify-between group hover:bg-white transition-all border border-transparent hover:border-indigo-100">
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white"><FileText size={24}/></div>
                    <div>
                      <h4 className="font-black italic uppercase text-lg text-slate-900 tracking-tight">{file.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{file.date} • {file.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-2xl">Download</Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW: SYMPTOM TRACKER */}
        {activeView === "tracker" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-end mb-16">
              <h1 className="text-6xl font-black italic text-slate-900 tracking-tighter uppercase">Glow <span className="text-indigo-600">Tracker</span></h1>
              <Button onClick={() => setIsLogging(true)} className="h-16 px-12 rounded-full">Log Symptom</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-indigo-600 p-14 rounded-[5rem] text-white flex flex-col justify-center">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Daily Wellness</h2>
                <div className="bg-white/10 px-8 py-4 rounded-3xl border border-white/20 self-start">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Logs</p>
                    <p className="font-black italic">{symptomLogs.length} Entries</p>
                </div>
              </div>
              <div className="lg:col-span-3 mt-4 space-y-4">
                {symptomLogs.map((log, i) => (
                  <div key={i} className="bg-white/60 p-6 rounded-[2.5rem] border border-white flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Stethoscope size={18}/></div>
                      <div>
                        <p className="text-sm font-black italic uppercase text-slate-800">{log.doc}</p>
                        <p className="text-xs font-bold text-slate-500 italic">"{log.note}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* MODAL: BOOKING */}
      <AnimatePresence>
        {isBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsBooking(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="bg-white p-14 rounded-[5rem] w-full max-w-2xl relative shadow-2xl">
              <button onClick={() => setIsBooking(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors font-black text-xl">✕</button>
              
              {step === 1 && (
                <div className="py-4">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-10">Choose <span className="text-indigo-600">Expert</span></h2>
                  <div className="flex flex-col gap-3">
                    {doctorsList.map((doc) => (
                      <button key={doc.id} onClick={() => { setBookingData({ ...bookingData, doctor: doc.name }); setStep(2); }} className="w-full p-8 border-2 border-slate-50 rounded-[2.5rem] hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-between items-center group">
                        <span className="font-black italic uppercase text-sm tracking-widest text-slate-800">{doc.name}</span>
                        <ArrowRight className="text-slate-200 group-hover:text-indigo-600 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="py-4">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Select <span className="text-indigo-600">Slot</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 italic">Consulting with {bookingData.doctor || "Specialist"}</p>
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    {timeSlots.map((time) => {
                      const booked = isSlotBooked(time);
                      return (
                        <button key={time} disabled={booked} onClick={() => setBookingData({ ...bookingData, time })} className={`py-6 rounded-[2rem] border-2 font-black text-[11px] uppercase tracking-widest transition-all
                          ${booked ? "bg-slate-100 border-transparent text-slate-400" : bookingData.time === time ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100" : "border-slate-50 text-slate-600 hover:border-indigo-400"}`}>
                          {time}
                        </button>
                      );
                    })}
                  </div>
                  <Button disabled={!bookingData.time} onClick={createAppointment} className="w-full h-20 rounded-full text-xs">Confirm Schedule</Button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-10">
                  <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10"><CheckCircle2 size={64} className="text-emerald-500" /></div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">Confirmed</h2>
                  <Button onClick={() => { setIsBooking(false); setStep(1); }} className="w-full h-20 rounded-full">Return Home</Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: SYMPTOM LOGGING */}
      <AnimatePresence>
        {isLogging && (
          <div className="fixed inset-0 flex items-center justify-center z-[110] px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => !logSuccess && setIsLogging(false)} />
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white p-14 rounded-[5rem] w-full max-w-2xl relative shadow-2xl">
              <AnimatePresence mode="wait">
                {!logSuccess ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-8">New <span className="text-indigo-600">Log Entry</span></h2>
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-3">
                        {doctorsList.map(doc => (
                          <button key={doc.id} onClick={() => setSymptomData({...symptomData, doctor: doc.name})} className={`p-5 rounded-[1.8rem] border-2 text-[10px] font-black uppercase tracking-widest transition-all ${symptomData.doctor === doc.name ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-50 text-slate-400'}`}>
                            {doc.name}
                          </button>
                        ))}
                      </div>
                      <textarea placeholder="Describe how you feel..." className="w-full p-8 rounded-[2.5rem] bg-slate-50 border-none text-sm font-bold italic h-32 outline-none" onChange={(e) => setSymptomData({...symptomData, notes: e.target.value})} />
                      <Button onClick={handleSaveSymptom} className="w-full h-16 rounded-full">Save Entry</Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <CheckCircle2 size={48} className="text-emerald-500 mb-6" />
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Logged!</h2>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}