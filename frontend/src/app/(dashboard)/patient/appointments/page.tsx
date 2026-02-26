"use client";

import { useState } from "react";
import { 
  Calendar, Clock, Video, MapPin, Plus, ChevronRight, 
  CheckCircle2, CalendarDays, X, ArrowLeft, Mic, MicOff, 
  Video as VideoIcon, VideoOff, MoreVertical, Star, ShieldCheck,
  User, MessageSquare, FileText, Download, Monitor, Activity, 
  Search, Thermometer, Droplets, Sparkles, TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATASET ---
const doctorsList = [
  { id: "as-1", name: "Dr. Ananya Sharma", role: "Senior Dermatologist", bio: "Chronic skin condition specialist with 15 years in clinical research.", rating: 4.9, education: "MD - Stanford", availability: "Mon-Fri", type: "In-Person" },
  { id: "mv-2", name: "Dr. Marcus Vane", role: "Clinical Specialist", bio: "Laser surgery and advanced diagnostics expert.", rating: 4.8, education: "MD - Johns Hopkins", availability: "Tue-Sat", type: "Video" },
  { id: "sp-3", name: "Dr. Sarah Paul", role: "Skin Esthetician", bio: "Focuses on aesthetic maintenance.", rating: 5.0, education: "NYU Esthetics", availability: "Weekends", type: "In-Person" },
  { id: "jw-4", name: "Dr. James Wilson", role: "Pathology Expert", bio: "Specialist in cellular analysis.", rating: 4.7, education: "MD - Harvard", availability: "Mon-Wed", type: "Video" },
  { id: "er-5", name: "Dr. Elena Rossi", role: "Cosmetic Surgeon", bio: "Expert in reconstructive surgery.", rating: 4.9, education: "MD - Yale", availability: "Thu-Fri", type: "In-Person" },
  { id: "mc-6", name: "Dr. Michael Chen", role: "Allergy Specialist", bio: "Immunotherapy expert.", rating: 4.6, education: "MD - UCLA", availability: "Mon-Fri", type: "Video" },
  { id: "lh-7", name: "Dr. Lisa Hsieh", role: "Pediatric Derm", bio: "Care for children's skin.", rating: 4.8, education: "MD - Columbia", availability: "Tue-Thu", type: "In-Person" },
  { id: "rb-8", name: "Dr. Robert Black", role: "Oncologist", bio: "Skin cancer screening.", rating: 5.0, education: "MD - Oxford", availability: "Mon-Fri", type: "Video" },
];

const initialPrescriptions = [
  { id: "RX-441", date: "Jan 25, 2026", doctor: "Dr. Sarah Paul", medicine: "Tretinoin 0.05% Cream", instructions: "Apply pea-sized amount at night.", status: "Active" },
  { id: "RX-392", date: "Dec 12, 2025", doctor: "Dr. Michael Chen", medicine: "Cetirizine 10mg", instructions: "One tablet daily after breakfast.", status: "Expired" }
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

const Button = ({ children, onClick, className, variant = "primary", disabled = false }: any) => {
  const variants: any = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
    outline: "border border-slate-200 text-slate-600 hover:bg-slate-50",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    ghost: "bg-transparent text-slate-400 hover:text-indigo-600"
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`px-4 py-2 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 font-bold ${variants[variant]} ${className}`}>{children}</button>
  );
};

export default function UltimatePatientDashboard() {
  const [activeView, setActiveView] = useState("schedule"); 
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ doctor: "", time: "", date: "Feb 12, 2026" });

  const [symptoms, setSymptoms] = useState([
    { date: "Jan 30", level: 3, note: "Slight redness on left cheek" },
    { date: "Jan 28", level: 5, note: "Dryness increased after wind exposure" }
  ]);
  const [newSymptom, setNewSymptom] = useState({ level: 5, note: "" });

  const startBooking = (docName?: string) => {
    setBookingData({ ...bookingData, doctor: docName || "" });
    setStep(docName ? 2 : 1);
    setIsBooking(true);
  };

  const handleAddSymptom = () => {
    if (!newSymptom.note) return;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setSymptoms([{ ...newSymptom, date }, ...symptoms]);
    setNewSymptom({ level: 5, note: "" });
    setShowSymptomModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-100 p-8 flex flex-col gap-10">
        <h2 className="text-3xl font-black italic tracking-tighter text-indigo-600 flex items-center gap-2">
          <Sparkles className="fill-indigo-600" /> Glow
        </h2>
        <nav className="flex flex-col gap-3">
          {[
            { id: "schedule", label: "Schedule", icon: <CalendarDays size={20}/> },
            { id: "doctors", label: "Specialists", icon: <User size={20}/> },
            { id: "records", label: "Prescriptions", icon: <FileText size={20}/> },
            { id: "tracker", label: "Symptom Log", icon: <Activity size={20}/> },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveView(item.id)} className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
          <p className="text-[10px] font-black uppercase opacity-60 mb-1 relative z-10">Current Plan</p>
          <p className="font-bold text-lg mb-4 italic relative z-10">Premium Health</p>
          <ShieldCheck className="absolute -bottom-4 -right-4 text-white/10" size={100} />
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-14 overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* VIEW: SCHEDULE (Updated with MapPin and MessageSquare) */}
          {activeView === "schedule" && (
            <motion.div key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <h1 className="text-5xl font-black tracking-tighter italic mb-2">My Schedule</h1>
                  <p className="text-slate-500 font-medium">You have 3 active consultations this month.</p>
                </div>
                <Button onClick={() => startBooking()} className="h-16 px-10 text-lg rounded-[1.5rem]">New Booking</Button>
              </div>

              <div className="grid gap-6">
                {doctorsList.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-8 w-full">
                      <div className="w-20 h-20 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center font-black text-indigo-600 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {doc.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold">{doc.name}</h3>
                          <span className="bg-emerald-100 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded uppercase font-sans tracking-widest italic">Live</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-4">{doc.role}</p>
                        <div className="flex flex-wrap gap-6 text-[11px] font-black uppercase text-slate-400 tracking-widest">
                          <span className="flex items-center gap-2 text-slate-900"><Calendar size={14} className="text-indigo-500"/> Feb 12</span>
                          <span className="flex items-center gap-2 text-slate-900"><Clock size={14} className="text-indigo-500"/> 10:30 AM</span>
                          <span className="flex items-center gap-2 text-indigo-600">
                             {doc.type === "In-Person" ? <><MapPin size={14}/> Clinic Visit</> : <><Video size={14}/> Video Call</>}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full lg:w-auto items-center">
                      <button className="p-4 text-slate-300 hover:text-indigo-600 transition-colors">
                        <MessageSquare size={22} />
                      </button>
                      <Button variant="outline" onClick={() => startBooking(doc.name)} className="flex-1 h-12 text-xs">Reschedule</Button>
                      <Button variant="dark" onClick={() => setIsCalling(true)} className="flex-1 h-12 px-8 text-xs">Join Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: DOCTOR DIRECTORY (Updated with Star) */}
          {activeView === "doctors" && (
            <motion.div key="doctors" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-12">
                <h1 className="text-5xl font-black tracking-tighter italic mb-4">Specialists</h1>
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Search by name..." className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:border-indigo-600 transition-all font-medium text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctorsList.map((doc) => (
                  <div key={doc.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 text-center hover:scale-[1.02] transition-all">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-3xl font-black text-indigo-600">{doc.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                       <Star size={12} className="fill-amber-400 text-amber-400" />
                       <span className="text-[10px] font-bold text-slate-600">{doc.rating}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{doc.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{doc.role}</p>
                    <Button variant="outline" onClick={() => { setSelectedDoc(doc); setActiveView("doc-profile"); }} className="w-full text-xs">View Profile</Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tracker View */}
          {activeView === "tracker" && (
            <motion.div key="tracker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-5xl font-black tracking-tighter italic mb-2">Symptom Log</h1>
                  <p className="text-slate-500 font-medium">Tracking your progress for Dr. Sharma.</p>
                </div>
                <Button onClick={() => setShowSymptomModal(true)} className="h-14 px-8"><Plus size={18}/> Log Today</Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {symptoms.map((log, i) => (
                    <motion.div layout key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start">
                      <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 font-black text-xs text-center min-w-[70px]">{log.date}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${log.level > 5 ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>Intensity: {log.level}/10</span>
                        </div>
                        <p className="font-bold text-slate-900 leading-relaxed italic">"{log.note}"</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-indigo-600 rounded-[3rem] p-10 text-white flex flex-col justify-between h-fit lg:sticky lg:top-10">
                  <TrendingUp size={40} className="mb-6 opacity-40" />
                  <h3 className="text-2xl font-black italic mb-4 leading-tight">Recovery Insight</h3>
                  <p className="text-sm opacity-80 leading-relaxed mb-8">Intensity has decreased by 12% since last week. You are on the right track!</p>
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">Health Score</p>
                    <p className="text-4xl font-black italic">82</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Records View */}
          {activeView === "records" && (
            <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-5xl font-black tracking-tighter italic mb-12">Prescriptions</h1>
              <div className="space-y-4">
                {initialPrescriptions.map((rx) => (
                  <div key={rx.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600"><Droplets /></div>
                      <div>
                        <h3 className="text-xl font-bold">{rx.medicine}</h3>
                        <p className="text-sm text-slate-500 font-medium mb-3">{rx.instructions}</p>
                        <div className="flex gap-4 text-[10px] font-black uppercase text-slate-400">
                          <span>By: <span className="text-indigo-600">{rx.doctor}</span></span>
                          <span>ID: {rx.id}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl mt-4 md:mt-0">
                      <Download size={18}/> Summary PDF
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Profile View */}
          {activeView === "doc-profile" && selectedDoc && (
            <motion.div key="doc-profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button onClick={() => setActiveView("doctors")} className="flex items-center gap-2 text-indigo-600 font-bold text-xs mb-8 uppercase tracking-widest"><ArrowLeft size={16} /> Directory</button>
              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-56 h-56 bg-indigo-50 rounded-[3.5rem] flex items-center justify-center text-7xl font-black text-indigo-600">{selectedDoc.name.split(' ').map((n: string) => n[0]).join('')}</div>
                <div className="flex-1">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">{selectedDoc.name}</h1>
                  <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-sm mb-8">{selectedDoc.role}</p>
                  <p className="text-xl text-slate-500 font-medium italic mb-10 leading-relaxed">"{selectedDoc.bio}"</p>
                  <div className="grid grid-cols-2 gap-10 border-t border-slate-50 pt-10">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Education</p><p className="font-bold text-lg">{selectedDoc.education}</p></div>
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Schedule</p><p className="font-bold text-lg">{selectedDoc.availability}</p></div>
                  </div>
                  <Button onClick={() => startBooking(selectedDoc.name)} className="h-18 px-12 text-xl rounded-[2rem] mt-10">Schedule Meeting</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {showSymptomModal && (
          <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSymptomModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-12 shadow-2xl">
              <h2 className="text-3xl font-black italic tracking-tighter mb-8 flex items-center gap-3"><Thermometer className="text-indigo-600"/> Log Symptom</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Intensity ({newSymptom.level}/10)</label>
                  <input type="range" min="1" max="10" value={newSymptom.level} onChange={(e) => setNewSymptom({...newSymptom, level: parseInt(e.target.value)})} className="w-full accent-indigo-600" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Describe the change</label>
                  <textarea placeholder="How does it feel today?" value={newSymptom.note} onChange={(e) => setNewSymptom({...newSymptom, note: e.target.value})} className="w-full h-32 bg-slate-50 rounded-2xl p-6 text-sm font-medium focus:outline-none focus:ring-2 ring-indigo-100 transition-all border-none" />
                </div>
                <Button onClick={handleAddSymptom} className="w-full h-16 text-lg">Save to Log</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCalling && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-slate-950 flex flex-col p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl">AS</div>
                <div>
                  <h4 className="font-bold text-white text-lg">Dr. Ananya Sharma</h4>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Live HD</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[12px] font-black text-white tracking-[0.2em]">08:24:12</div>
            </div>
            <div className="flex-1 bg-slate-900 rounded-[4rem] relative overflow-hidden flex items-center justify-center">
              <User size={60} className="text-indigo-500 opacity-20 mx-auto mb-4"/>
              <div className={`absolute bottom-10 right-10 w-80 aspect-video bg-slate-800 rounded-[2.5rem] border-4 border-white/5 overflow-hidden ${!videoOn ? 'flex items-center justify-center' : ''}`}>
                {!videoOn ? <VideoOff size={40} className="text-slate-700"/> : <div className="w-full h-full bg-slate-700" />}
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase text-white tracking-widest">You</div>
              </div>
            </div>
            <div className="mt-10 flex justify-center items-center gap-6">
              <button onClick={() => setMicOn(!micOn)} className={`p-8 rounded-[2.5rem] ${micOn ? 'bg-white/5 text-white' : 'bg-rose-600 text-white'}`}>{micOn ? <Mic size={28}/> : <MicOff size={28}/>}</button>
              <button onClick={() => setVideoOn(!videoOn)} className={`p-8 rounded-[2.5rem] ${videoOn ? 'bg-white/5 text-white' : 'bg-rose-600 text-white'}`}>{videoOn ? <VideoIcon size={28}/> : <VideoOff size={28}/>}</button>
              <button className="p-8 bg-white/5 text-white rounded-[2.5rem]"><Monitor size={28}/></button>
              <Button variant="danger" onClick={() => setIsCalling(false)} className="h-24 px-16 rounded-[3rem] text-sm uppercase tracking-[0.3em] font-black">End Session</Button>
              <button className="p-8 bg-white/5 text-white rounded-[2.5rem]"><MoreVertical size={28}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBooking && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBooking(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
            <motion.div layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-2xl overflow-hidden">
              <button onClick={() => setIsBooking(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900"><X size={28} /></button>
              {step === 1 && (
                <div>
                  <h2 className="text-4xl font-black italic tracking-tighter mb-10">Select Specialist</h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                    {doctorsList.map(doc => (
                      <button key={doc.id} onClick={() => { setBookingData({...bookingData, doctor: doc.name}); setStep(2); }} className="w-full p-6 rounded-[2rem] border border-slate-50 hover:border-indigo-600 hover:bg-indigo-50/50 text-left flex justify-between items-center group transition-all font-bold">
                        {doc.name} <ChevronRight size={20} className="text-slate-200 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="text-4xl font-black italic tracking-tighter mb-2">Pick a Time</h2>
                  <p className="text-xs font-bold text-slate-400 mb-10 uppercase tracking-widest">Booking with {bookingData.doctor}</p>
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {timeSlots.map(time => (
                      <button key={time} onClick={() => setBookingData({...bookingData, time})} className={`py-5 rounded-[1.5rem] border-2 font-black text-xs transition-all ${bookingData.time === time ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'border-slate-50 text-slate-500 hover:border-indigo-200'}`}>{time}</button>
                    ))}
                  </div>
                  <Button disabled={!bookingData.time} onClick={() => setStep(3)} className="w-full h-20 text-lg rounded-[2rem]">Confirm Booking</Button>
                </div>
              )}
              {step === 3 && (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8"><CheckCircle2 size={48} /></div>
                  <h2 className="text-4xl font-black italic tracking-tighter mb-4">Confirmed!</h2>
                  <p className="text-slate-500 font-medium mb-10 italic">Appointment set for {bookingData.date} at {bookingData.time}.</p>
                  <Button onClick={() => setIsBooking(false)} className="w-full h-18 text-lg rounded-[2rem]">Back to Dashboard</Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}