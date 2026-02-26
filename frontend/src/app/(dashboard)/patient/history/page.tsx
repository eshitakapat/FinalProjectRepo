"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { 
  History, Calendar, TrendingDown, 
  FileText, ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const historyData = [
  {
    id: 1,
    date: "Jan 28, 2026",
    diagnosis: "Contact Dermatitis",
    confidence: "94%",
    status: "Improving",
    metrics: { redness: 32, texture: 78 },
    doctorNote: "Visible reduction in inflammation compared to last week."
  },
  {
    id: 2,
    date: "Jan 12, 2026",
    diagnosis: "Contact Dermatitis",
    confidence: "89%",
    status: "Flare-up",
    metrics: { redness: 68, texture: 45 },
    doctorNote: "Acute redness detected. Prescribed Hydrocortisone 1%."
  },
  {
    id: 3,
    date: "Dec 20, 2025",
    diagnosis: "Clear Scan",
    confidence: "98%",
    status: "Healthy",
    metrics: { redness: 12, texture: 92 },
    doctorNote: "Baseline scan recorded. No issues found."
  }
];

export default function MedicalHistory() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
            <History size={20} />
            <span className="text-xs uppercase tracking-[0.2em]">Patient Records</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Healing Journey</h1>
        </div>
        <Button className="bg-slate-900 text-white rounded-2xl px-8 h-12 font-bold shadow-xl">
          Export PDF
        </Button>
      </div>

      {/* Timeline Path */}
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-200 before:to-transparent">
        
        {historyData.map((record, index) => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Dot Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Calendar size={16} />
            </div>

            {/* Content Card */}
            <Card className="w-[calc(100%-4rem)] md:w-[45%] p-8 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-none">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{record.date}</span>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  record.status === 'Improving' ? 'bg-emerald-50 text-emerald-600' : 
                  record.status === 'Flare-up' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {record.status}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">{record.diagnosis}</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <TrendingDown size={14} className="text-emerald-500" />
                  Redness: {record.metrics.redness}%
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <CheckCircle2 size={14} className="text-blue-500" />
                  Confidence: {record.confidence}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={14} className="text-indigo-600" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Doctor Note</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{record.doctorNote}"</p>
              </div>

              <Button variant="ghost" className="w-full text-indigo-600 font-bold text-xs p-0 flex justify-between group">
                View Full Analysis <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        ))}

      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        <Card className="p-8 bg-indigo-600 text-white rounded-[2.5rem] border-none">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Treatment Duration</p>
          <p className="text-4xl font-black mt-2 tracking-tighter italic">39 Days Active</p>
          <div className="mt-6 flex gap-2">
             <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4" />
             </div>
          </div>
        </Card>
        <Card className="p-8 bg-white rounded-[2.5rem] border-none shadow-sm">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Scans Performed</p>
           <p className="text-4xl font-black mt-2 text-slate-900 tracking-tighter italic">12 Reports</p>
           <p className="text-xs text-emerald-500 font-bold mt-4">+3 since last month</p>
        </Card>
      </div>
    </div>
  );
}