"use client";

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { 

  FileText, Download, ExternalLink, Filter, 

  Search, Clock, ShieldCheck, Activity, 

  ChevronRight, FileSpreadsheet, FilePlus 

} from 'lucide-react';

import { cn } from "@/lib/utils";



// Mock Data - In a real app, this would come from your API/Database

const RECORDS_DATA = [

  { id: 1, title: "Dermatology Consultation", date: "March 12, 2026", type: "Diagnostic", provider: "Dr. Sharma", status: "Final", size: "1.2 MB" },

  { id: 2, title: "Blood Chemistry Panel", date: "Feb 28, 2026", type: "Laboratory", provider: "CareFlow Labs", status: "Final", size: "850 KB" },

  { id: 3, title: "Isotretinoin Prescription", date: "Feb 15, 2026", type: "Prescription", provider: "Dr. Sharma", status: "Active", size: "450 KB" },

  { id: 4, title: "Skin Biopsy Results", date: "Jan 10, 2026", type: "Pathology", provider: "Biotech Labs", status: "Archived", size: "2.4 MB" },

];



export default function MedicalRecordsPage() {

  const [searchTerm, setSearchTerm] = useState("");



  const filteredRecords = RECORDS_DATA.filter(record => 

    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

    record.provider.toLowerCase().includes(searchTerm.toLowerCase())

  );



  return (

    <motion.div 

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="max-w-[1600px] mx-auto space-y-10 pb-20"

    >

      {/* --- TOP HEADER SECTION --- */}

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">

        <div className="space-y-2">

          <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">

            <ShieldCheck size={14} /> 256-bit Encrypted Vault

          </div>

          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">

            Medical <span className="text-blue-600">Records</span>

          </h1>

          <p className="text-slate-400 font-bold text-sm">Access your clinical history and diagnostic data.</p>

        </div>



        <div className="flex flex-wrap gap-3">

          <div className="relative group">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />

            <input 

              type="text"

              placeholder="Filter documents..."

              value={searchTerm}

              onChange={(e) => setSearchTerm(e.target.value)}

              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-50 outline-none w-64 transition-all"

            />

          </div>

          <button className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] font-black italic uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">

            <FilePlus size={18} /> Request Copy

          </button>

        </div>

      </div>



      {/* --- STATS GRID --- */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {[

    { label: "Total Docs", value: "24", icon: <FileText />, color: "bg-blue-50 text-blue-600" },

    { label: "Lab Reports", value: "08", icon: <Activity />, color: "bg-emerald-50 text-emerald-600" },

    { label: "Prescriptions", value: "03", icon: <FileSpreadsheet />, color: "bg-indigo-50 text-indigo-600" },

    { label: "Unread", value: "01", icon: <Clock />, color: "bg-rose-50 text-rose-600" },

  ].map((stat, i) => (

    <motion.div 

      key={i}

      whileHover={{ y: -5 }}

      className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm flex items-center gap-6"

    >

      <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center", stat.color)}>

        {/* FIX: Cast the icon to any or React.ReactElement<{size: number}> */}

        {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 28 })}

      </div>

      <div>

        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>

        <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>

      </div>

    </motion.div>

  ))}

</div>



      {/* --- RECORDS TABLE/LIST --- */}

      <div className="bg-white rounded-[3.5rem] border border-slate-50 shadow-xl shadow-slate-100/50 overflow-hidden">

        <div className="p-10 border-b border-slate-50 flex justify-between items-center">

          <h3 className="font-black italic uppercase text-xl text-slate-900 tracking-tighter">Clinical Archive</h3>

          <div className="flex gap-2">

            <span className="w-3 h-3 rounded-full bg-slate-100" />

            <span className="w-3 h-3 rounded-full bg-slate-100" />

            <span className="w-3 h-3 rounded-full bg-slate-100" />

          </div>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="bg-slate-50/50">

                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Document / ID</th>

                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Issued</th>

                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>

                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Specialist</th>

                <th className="px-10 py-6 text-right"></th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-50">

              <AnimatePresence>

                {filteredRecords.map((record) => (

                  <motion.tr 

                    layout

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    exit={{ opacity: 0 }}

                    key={record.id} 

                    className="group hover:bg-blue-50/30 transition-all cursor-pointer"

                  >

                    <td className="px-10 py-8">

                      <div className="flex items-center gap-5">

                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">

                          <FileText size={20} />

                        </div>

                        <div>

                          <p className="text-sm font-black text-slate-800 tracking-tight">{record.title}</p>

                          <p className="text-[10px] font-bold text-slate-400 uppercase">{record.size}</p>

                        </div>

                      </div>

                    </td>

                    <td className="px-10 py-8">

                      <p className="text-xs font-black text-slate-500 italic">{record.date}</p>

                    </td>

                    <td className="px-10 py-8">

                      <span className={cn(

                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",

                        record.type === "Prescription" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"

                      )}>

                        {record.type}

                      </span>

                    </td>

                    <td className="px-10 py-8">

                      <p className="text-xs font-bold text-slate-700">{record.provider}</p>

                    </td>

                    <td className="px-10 py-8">

                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">

                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all">

                          <Download size={18} />

                        </button>

                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all">

                          <ExternalLink size={18} />

                        </button>

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </AnimatePresence>

            </tbody>

          </table>

          

          {filteredRecords.length === 0 && (

            <div className="p-20 text-center">

              <p className="text-slate-400 font-black italic uppercase tracking-tighter">No records found matching "{searchTerm}"</p>

            </div>

          )}

        </div>

      </div>

    </motion.div>

  );

}