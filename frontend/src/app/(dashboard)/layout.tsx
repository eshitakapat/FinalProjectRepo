"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Grid, Calendar, History, Settings, CreditCard, 
  LogOut, Bell, Search, Activity, User 
} from "lucide-react";
import ChatBot from "@/components/shared/ChatBot"; // 1. IMPORT YOUR CHATBOT

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const menuItems = [
    { name: "My Skin", path: "/patient", icon: <Grid size={20} /> },
    { name: "Appointments", path: "/patient/appointments", icon: <Calendar size={20} /> },
    // { name: "Medical Records", path: "/patient/medical-records", icon: <History size={20} /> },
    { name: "Billing & Plans", path: "/patient/billing", icon: <CreditCard size={20} /> },
    // { name: "Settings", path: "/patient/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#FBFCFD] overflow-hidden antialiased relative">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0 bg-white z-[50]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Activity size={22} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
            CareFlow
          </span>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
                pathname === item.path
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-rose-500 font-bold text-sm w-full hover:bg-rose-50 cursor-pointer rounded-2xl transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
        <header className="h-20 border-b border-slate-50 flex items-center justify-between px-10 bg-white sticky top-0 z-40">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="Search health records..."
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell size={20} className="text-slate-300 cursor-pointer hover:text-blue-600" />
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white ring-4 ring-slate-50 shadow-md">
              <User size={20} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-[#FBFCFD]">
          {children}
        </main>

        {/* 2. THE CHATBOT INTEGRATION */}
        {/* We place it here so it floats over the main content area */}
        <ChatBot 
           role="patient" 
           patientData={{ skinType: "Oily", allergies: "Latex" }} // Replace with real user data later
        />
      </div>
    </div>
  );
}