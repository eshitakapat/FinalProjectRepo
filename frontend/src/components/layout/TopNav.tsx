"use client";
import { Search, Bell, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TopNav() {
  return (
    <div className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Universal Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search records, appointments, or help..."
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-slate-500">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500">
          <HelpCircle size={20} />
        </Button>
        <div className="h-8 w-[1px] bg-slate-100 mx-2" />
        
        {/* User Profile Mini */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-900">CareFlow User</p>
            <p className="text-[10px] text-slate-400 font-medium">Verified Account</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
            CF
          </div>
        </div>
      </div>
    </div>
  );
}