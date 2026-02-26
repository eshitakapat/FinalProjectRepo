"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, User, Stethoscope, 
  Settings, LogOut, Calendar, 
  ShieldCheck, PieChart 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define navigation based on roles
const navigation = {
  patient: [
    { name: "My Skin", href: "/patient", icon: LayoutDashboard },
    { name: "Appointments", href: "/patient/appointments", icon: Calendar },
    { name: "Medical Records", href: "/patient/records", icon: User },
  ],
  doctor: [
    { name: "Clinical Suite", href: "/doctor", icon: Stethoscope },
    { name: "Schedule", href: "/doctor/schedule", icon: Calendar },
    { name: "Patient List", href: "/doctor/patients", icon: User },
  ],
  admin: [
    { name: "Hospital Hub", href: "/admin", icon: ShieldCheck },
    { name: "Financials", href: "/admin/finance", icon: PieChart },
    { name: "Staff Management", href: "/admin/staff", icon: User },
  ]
};

export default function Sidebar({ role }: { role: 'patient' | 'doctor' | 'admin' }) {
  const pathname = usePathname();
  const menuItems = navigation[role];

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-slate-100 p-6 sticky top-0">
      {/* 1. Brand Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-100 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">CareFlow</span>
      </div>

      {/* 2. Main Role-Based Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-4">
          Main Menu
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-900")} />
              {item.name}
            </Link>
          );
        })}

        {/* Universal Settings Link */}
        <Link
          href={`/${role}/settings`}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group mt-4",
            pathname.includes("settings")
              ? "bg-blue-50 text-blue-600"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <Settings size={20} className={cn(pathname.includes("settings") ? "text-blue-600" : "text-slate-400 group-hover:text-slate-900")} />
          Settings
        </Link>
      </nav>

      {/* 3. Logout Footer */}
      <div className="pt-6 border-t border-slate-100">
        <Link href="/">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}