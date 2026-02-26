"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, Download, Search, Filter, Database, Activity, Beaker, Calendar, User 
} from "lucide-react";
import { motion } from "framer-motion";

const records = [
  {
    id: "REC-001",
    title: "Dermatology Clinical Note",
    doctor: "Dr. Ananya Sharma",
    date: "Jan 20, 2026",
    category: "Consultation",
    type: "PDF"
  },
  {
    id: "LAB-402",
    title: "Blood Panel & Vitamin Levels",
    doctor: "City Labs Inc.",
    date: "Jan 15, 2026",
    category: "Lab Result",
    type: "PDF"
  },
  {
    id: "RX-992",
    title: "Tretinoin & Hydration Plan",
    doctor: "Dr. Marcus Vane",
    date: "Dec 11, 2025",
    category: "Prescription",
    type: "Digital"
  }
];

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Medical Vault</h1>
          <p className="text-slate-500 font-medium">Access your history, lab results, and prescriptions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl h-12 border-slate-200 font-bold gap-2">
            <Download size={18} /> Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Blood Type", val: "A+", icon: <Activity className="text-rose-500" />, bg: "bg-rose-50" },
          { label: "Allergies", val: "Latex, Pollen", icon: <Database className="text-indigo-500" />, bg: "bg-indigo-50" },
          { label: "Last Checkup", val: "12 Days Ago", icon: <Beaker className="text-emerald-500" />, bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className={`p-6 border-none shadow-sm ${stat.bg} rounded-[2rem] flex items-center gap-4`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
              <p className="text-lg font-bold text-slate-900">{stat.val}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex gap-4 items-center bg-white p-2 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="pl-4 text-slate-400"><Search size={20} /></div>
        <input 
          type="text" 
          placeholder="Search by doctor, record type, or date..." 
          className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-sm text-slate-600"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="ghost" className="rounded-xl gap-2 font-bold text-slate-500">
          <Filter size={18} /> Filters
        </Button>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
          <FileText size={14} /> Document Timeline
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {records.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).map((record, i) => (
            <motion.div 
              key={record.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 border-none shadow-sm bg-white rounded-[2.5rem] flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{record.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <User size={12} /> {record.doctor}
                      </p>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Calendar size={12} /> {record.date}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="hidden md:block text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">
                    {record.category}
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                    <Download size={20} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}