"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, Clock, Clipboard, Activity, 
  Search, Sparkles, ChevronRight, Stethoscope 
} from "lucide-react";
import ChatBot from "@/components/shared/ChatBot"; // We will build this next

export default function DoctorDashboard() {
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const queue = [
    { name: "Alex Johnson", time: "10:30 AM", type: "Acne Follow-up", status: "Waiting", priority: "Routine" },
    { name: "Sarah Miller", time: "11:15 AM", type: "Eczema Check", status: "In Room", priority: "Urgent" },
    { name: "Mark Thompson", time: "11:45 AM", type: "Skin Tag Removal", status: "Waiting", priority: "Routine" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Clinical Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Clinical Suite</h1>
          <p className="text-slate-500 font-medium">Welcome back, Dr. Smith. You have 8 patients remaining today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 gap-2">
            <Search size={18} /> Search Records
          </Button>
          <Button className="bg-indigo-600 rounded-xl gap-2 shadow-lg shadow-indigo-100">
            <Activity size={18} /> Emergency Mode
          </Button>
        </div>
      </div>

      {/* 2. Vital Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Queue", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg. Session", value: "18m", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Completion", value: "65%", icon: Clipboard, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Lab Reports", value: "4 New", icon: Stethoscope, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat, i) => (
          <Card key={i} className="p-4 border-none shadow-sm flex items-center gap-4 bg-white">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Main Queue List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Incoming Patients</h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Live Updates</span>
          </div>
          
          <div className="space-y-4">
            {queue.map((p, i) => (
              <Card key={i} className="p-5 flex items-center justify-between group hover:border-indigo-200 transition-all border-slate-100 shadow-sm bg-white rounded-[1.5rem]">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-lg border border-slate-100">
                      {p.name[0]}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${p.status === 'In Room' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">{p.name}</p>
                      {p.priority === 'Urgent' && (
                        <span className="text-[8px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-md uppercase tracking-tighter">Urgent</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Activity size={12} /> {p.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="font-black text-sm text-slate-900">{p.time}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Scheduled</p>
                  </div>
                  <Button className="bg-slate-900 hover:bg-indigo-600 text-white rounded-xl px-6 group-hover:shadow-lg transition-all gap-2">
                    Start <ChevronRight size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. AI Diagnostics Sidebar */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Clinical AI Assistant</h2>
          <Card className="p-6 border-none shadow-xl bg-indigo-600 text-white rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">DermAssist AI</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Scan patient records or upload photos for AI-driven diagnostic suggestions.
              </p>
              <Button 
                onClick={() => {
                  setIsAiProcessing(true);
                  setTimeout(() => setIsAiProcessing(false), 2000);
                }}
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl py-6"
              >
                {isAiProcessing ? "Analyzing Data..." : "Analyze Current Patient"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-[2rem]">
            <h3 className="font-black text-slate-900 mb-4 text-xs uppercase tracking-widest">Today's Focus</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-700">Medical Conference @ 4PM</p>
                <p className="text-[10px] text-slate-500">Subject: Advanced Psoriasis Biology</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. The Role-Specific Chatbot */}
      <ChatBot role="doctor" />
    </div>
  );
}