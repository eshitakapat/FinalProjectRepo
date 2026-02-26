"use client";

import { useState } from "react";
import { 
  User, ShieldAlert, Droplets, MapPin, 
  Mail, Phone, Camera, Save, Bell,
  Scale, Ruler, Activity, Heart, Edit2,
  Plus, CheckCircle2, X, TrendingUp, History,
  ArrowDownRight, Sparkles, ShieldCheck,
  Smartphone, Fingerprint, Lock, Download, 
  Eye, Trash2, Share2, FileText, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Base UI Components ---
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100/50 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, variant, className }: any) => {
  const variants: any = {
    outline: "border border-slate-200 hover:bg-slate-50 text-slate-900",
    ghost: "bg-transparent hover:bg-white/10 text-white",
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
    secondary: "bg-slate-900 text-white hover:bg-slate-800"
  };
  return (
    <button onClick={onClick} className={`flex items-center justify-center transition-all active:scale-95 font-bold disabled:opacity-50 ${variants[variant || "primary"]} ${className}`}>
      {children}
    </button>
  );
};

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview, security, privacy
  const [stats, setStats] = useState({
    weight: "72", height: "178", blood: "A+", heartRate: "72",
    allergies: "Latex, Peanuts", skinType: "Combination"
  });

  const metrics = [
    { id: "w", label: "Weight", val: stats.weight, unit: "kg", icon: <Scale size={20}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "h", label: "Height", val: stats.height, unit: "cm", icon: <Ruler size={20}/>, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: "b", label: "Blood", val: stats.blood, unit: "Type", icon: <Droplets size={20}/>, color: "text-rose-600", bg: "bg-rose-50" },
    { id: "hr", label: "Heart Rate", val: stats.heartRate, unit: "bpm", icon: <Activity size={20}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto pb-24 font-sans selection:bg-indigo-100 bg-slate-50/30 min-h-screen">
      
      {/* 1. NAVIGATION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Patient Command</h1>
          <p className="text-slate-500 font-medium italic">Manage health data & privacy protocols.</p>
        </motion.div>
        
        <div className="bg-white p-1.5 rounded-[2rem] flex gap-1 shadow-inner border border-slate-100">
          {["overview", "security", "privacy"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <Card key={m.id} className="p-6 border-none rounded-[2.5rem] relative overflow-hidden group h-full">
                  <div className={`absolute top-4 right-4 p-2 rounded-xl opacity-20 group-hover:opacity-100 transition-opacity ${m.bg} ${m.color}`}>{m.icon}</div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">{m.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{m.val}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase">{m.unit}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Profile Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="p-8 text-center border-none rounded-[3rem] relative overflow-hidden bg-white">
                  <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center text-4xl font-black text-indigo-600 border-4 border-white shadow-xl relative group">
                    AJ
                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2.5rem]">
                      <Camera size={24} className="text-white" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-none">Alex Johnson</h2>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter italic">Pro Member</span>
                  </div>
                  <Button variant="outline" className="w-full mt-6 rounded-2xl h-12 text-xs uppercase tracking-widest" onClick={() => setIsEditing(true)}>
                    Edit Core Stats
                  </Button>
                </Card>

                {/* AI Insight Card */}
                <Card className="p-8 border-none rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden">
                  <Sparkles className="absolute -top-4 -right-4 opacity-20" size={100} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={14}/> AI Insight
                  </h3>
                  <p className="text-sm font-medium leading-relaxed italic">"Your heart rate stability is in the top 5% of your age group. Based on your BMI, hydration should be 3L today."</p>
                </Card>
              </div>

              {/* Central Analysis */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-8 border-none rounded-[3rem] bg-white">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp size={16} className="text-indigo-500" /> Metric Trends
                    </h3>
                    <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase p-2 outline-none">
                      <option>Weight</option>
                      <option>Heart Rate</option>
                    </select>
                  </div>
                  <div className="h-40 w-full flex items-end gap-3">
                    {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                      <motion.div 
                        key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05 }}
                        className="flex-1 bg-slate-50 hover:bg-indigo-500 rounded-t-xl transition-colors cursor-pointer group relative"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Day {i+1}: {h}%</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-black text-slate-300 uppercase">
                    <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-8 border-none rounded-[3rem] bg-white">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldAlert size={16} className="text-rose-500"/> Critical Info
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Known Allergies</p>
                        <p className="font-bold text-slate-900">{stats.allergies}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Skin Type</p>
                        <p className="font-bold text-slate-900">{stats.skinType}</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-8 border-none rounded-[3rem] bg-slate-900 text-white overflow-hidden relative group">
                    <Heart size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-all" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-indigo-400">Emergency Liaison</h3>
                    <p className="text-xl font-black italic tracking-tighter leading-none">Sarah Miller</p>
                    <p className="text-xs font-bold text-slate-400 mt-2">Spouse • +1 555 0123</p>
                    <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-1">
                      Quick Call <ChevronRight size={12}/>
                    </button>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div 
            key="security"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="p-10 border-none rounded-[3rem] bg-white">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl"><Lock size={24}/></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Access Protection</h3>
                  <p className="text-xs text-slate-400 font-bold">Manage your biometric and MFA keys.</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Two-Factor Authentication", icon: <Smartphone size={18}/>, status: "Enabled", active: true },
                  { label: "Biometric Login (FaceID)", icon: <Fingerprint size={18}/>, status: "Active", active: true },
                  { label: "Hardware Security Key", icon: <ShieldCheck size={18}/>, status: "Not Linked", active: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem]">
                    <div className="flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-tight">
                       <span className="text-indigo-600">{item.icon}</span> {item.label}
                    </div>
                    <div className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${item.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>{item.status}</div>
                  </div>
                ))}
              </div>
              <Button className="w-full h-14 mt-10 rounded-2xl text-xs uppercase tracking-widest">Update Security Vault</Button>
            </Card>

            <Card className="p-10 border-none rounded-[3rem] bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center">
               <ShieldCheck size={180} className="absolute -bottom-10 -right-10 opacity-10" />
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Security Status</p>
                 <h3 className="text-5xl font-black italic tracking-tighter mb-4">Elite</h3>
                 <div className="w-full h-2 bg-white/10 rounded-full mb-6">
                    <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} className="h-full bg-indigo-500 rounded-full" />
                 </div>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">Your data is encrypted with AES-256. Last security audit: <span className="text-white">Today, 08:45 AM</span></p>
               </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "privacy" && (
          <motion.div 
            key="privacy"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Data Export */}
              <Card className="p-8 border-none rounded-[3.5rem] bg-white group cursor-pointer hover:bg-indigo-600 transition-all border-2 border-transparent hover:border-indigo-400">
                <div className="p-5 bg-indigo-50 text-indigo-600 rounded-2xl w-fit group-hover:bg-white/20 group-hover:text-white transition-colors mb-8">
                  <Download size={28}/>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tighter">Export Health ID</h3>
                <p className="text-xs font-bold text-slate-400 group-hover:text-white/60 transition-colors mt-2">Download clinical data as encrypted PDF or JSON.</p>
              </Card>

              {/* Data Access Control */}
              <Card className="p-8 border-none rounded-[3.5rem] bg-white md:col-span-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Eye size={16}/> Active Data Permissions
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Chen • General Hosp.", role: "Primary Specialist", access: "Full" },
                    { name: "MediScan Analytics", role: "AI Lab Service", access: "Read-Only" }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-5 border border-slate-100 rounded-[2rem] hover:border-indigo-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold text-xs">{doc.name[4]}</div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{doc.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{doc.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[9px] font-black uppercase text-indigo-600 mr-2 flex items-center">{doc.access}</span>
                        <Button variant="outline" className="h-10 w-10 rounded-xl p-0"><Share2 size={14}/></Button>
                        <Button variant="danger" className="h-10 w-10 rounded-xl p-0"><Trash2 size={14}/></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Privacy Compliance */}
            <Card className="p-10 border-none rounded-[3.5rem] bg-rose-50/30 border-2 border-rose-100/50">
               <div className="flex items-center gap-6 mb-10">
                  <div className="p-5 bg-rose-100 text-rose-600 rounded-3xl"><ShieldAlert size={30}/></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Data Sovereignty</h3>
                    <p className="text-sm text-slate-400 font-bold max-w-xl">Under GDPR and HIPAA regulations, you have the right to be forgotten. Archiving will hide data; deletion is permanent.</p>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row gap-4">
                  <Button variant="outline" className="flex-1 h-16 rounded-2xl text-xs uppercase tracking-widest hover:bg-white">Archive History</Button>
                  <Button variant="danger" className="flex-1 h-16 rounded-2xl text-xs uppercase tracking-widest">Permanent Account Wipe</Button>
               </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER INFO BAR */}
      <Card className="p-8 border-none rounded-[3rem] bg-slate-900 grid grid-cols-1 md:grid-cols-3 gap-8 text-white relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/5 rounded-2xl text-indigo-400"><Mail size={20}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Contact</p>
            <p className="text-sm font-bold">alex.j@icloud.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/5 rounded-2xl text-indigo-400"><Phone size={20}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recovery Phone</p>
            <p className="text-sm font-bold">+1 (555) 000 1234</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/5 rounded-2xl text-indigo-400"><MapPin size={20}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base Region</p>
            <p className="text-sm font-bold">Los Angeles, USA</p>
          </div>
        </div>
      </Card>
    </div>
  );
}