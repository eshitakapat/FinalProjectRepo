"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  ShieldCheck, TrendingUp, Users, DollarSign, 
  Activity, Download, Settings, Search,
  Briefcase, BarChart3, AlertCircle, LayoutDashboard
} from "lucide-react";
import ChatBot from "@/components/shared/ChatBot";

export default function AdminDashboard() {
  const [reportLoading, setReportLoading] = useState(false);

  const staffStatus = [
    { name: "Dr. Sharma", dept: "Dermatology", status: "Active", load: "90%" },
    { name: "Dr. Smith", dept: "Cosmetic", status: "In Surgery", load: "100%" },
    { name: "Nurse Joy", dept: "OPD", status: "On Break", load: "0%" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Header: Command Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-slate-900 text-white border-none px-3 py-1">System Admin</Badge>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live System
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Hospital Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring 4 active departments across 2 wings.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => {
              setReportLoading(true);
              setTimeout(() => setReportLoading(false), 1500);
            }}
            className="rounded-xl border-slate-200 gap-2 h-12"
          >
            <Download size={18} /> {reportLoading ? "Exporting..." : "Export Reports"}
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg h-12 gap-2">
            <Settings size={18} /> Configuration
          </Button>
        </div>
      </div>

      {/* 2. Global KPIs (Your original stats + Growth) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-5 bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-[2rem]">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-[1.5rem] shadow-inner">
            <TrendingUp size={28} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Revenue Today</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+14%</span>
            </div>
            <p className="text-3xl font-black text-slate-900">$4,250</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-5 bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-[2rem]">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.5rem] shadow-inner">
            <Users size={28} />
          </div>
          <div className="flex-1">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Active Staff</p>
             <p className="text-3xl font-black text-slate-900">12 <span className="text-lg text-slate-300">/ 15</span></p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-5 bg-slate-900 text-white border-none shadow-xl rounded-[2rem] overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <ShieldCheck size={80} />
          </div>
          <div className="p-4 bg-white/10 text-emerald-400 rounded-[1.5rem] backdrop-blur-md">
            <ShieldCheck size={28} />
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">System Status</p>
            <p className="text-3xl font-black text-emerald-400 tracking-tighter">SECURE</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Operational Insights */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-bold text-xl text-slate-900 tracking-tight">Department Traffic</h3>
              <Badge variant="outline" className="border-slate-100 text-slate-400">Past 24 Hours</Badge>
            </div>
            
            {/* Visual Analytics Bar Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-4 px-2">
              {[35, 60, 45, 90, 55, 70].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div 
                    className="w-full bg-slate-50 rounded-2xl relative group overflow-hidden transition-all hover:bg-indigo-50" 
                    style={{ height: `100%` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-xl transition-all duration-1000" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Wing {i+1}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Room Availability Map (Your requested feature, now styled) */}
          <Card className="p-8 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2.5rem] relative group overflow-hidden">
             <div className="flex flex-col items-center justify-center py-10">
                <LayoutDashboard className="text-slate-300 mb-4 group-hover:text-indigo-400 transition-colors" size={48} />
                <h3 className="font-bold text-slate-800">Room Availability Map</h3>
                <p className="text-xs text-slate-400 italic max-w-xs text-center mt-2 leading-relaxed">
                  Integrating real-time IoT sensors. Floor plan visualization will be available in v2.4 update.
                </p>
                <Button variant="ghost" className="mt-6 text-indigo-600 font-bold text-xs hover:bg-indigo-50">View Alpha Preview →</Button>
             </div>
          </Card>
        </div>

        {/* 4. Staff Monitoring Sidebar */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Live Staffing</h2>
          <Card className="p-6 border-none shadow-sm bg-white rounded-[2rem]">
            <div className="space-y-6">
              {staffStatus.map((staff, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600">
                      {staff.name[4]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{staff.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                      staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {staff.status}
                    </span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: staff.load }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl py-6">
              Manage All Personnel
            </Button>
          </Card>

          {/* System Alerts */}
          <Card className="p-6 bg-rose-50 border-none rounded-[2rem]">
            <div className="flex items-center gap-2 mb-4 text-rose-600">
              <AlertCircle size={18} />
              <h4 className="font-bold text-xs uppercase tracking-widest">Critical Alerts</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/50 rounded-xl border border-rose-100">
                <p className="text-[11px] text-rose-800 font-bold">Lab Sync Interrupted</p>
                <p className="text-[9px] text-rose-500">Manual review required for Wing 3</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. The Admin AI Chatbot */}
      <ChatBot role="admin" />
    </div>
  );
}``