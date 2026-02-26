"use client";
import Link from "next/link";
import { useScroll } from "../../hooks/use-scroll";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const scrolled = useScroll();

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-10 py-6",
      scrolled 
        ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO - CAREFLOW */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
            <span className="font-black text-lg italic tracking-tighter">C</span>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
            Care<span className="text-blue-600">Flow</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS - CENTER AREA REMOVED AS REQUESTED */}
        <div className="hidden md:flex items-center gap-8">
            {/* Keeping this empty to maintain spacing or for future minimalist alerts */}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          
          {/* SIGN IN BUTTON */}
          <Link href="/login">
            <button className="px-6 py-2.5 font-black text-[11px] text-slate-500 hover:text-blue-600 uppercase tracking-[0.2em] transition-all italic">
              Sign In
            </button>
          </Link>

          {/* SIGN UP BUTTON (Main Action) */}
          <Link href="/login">
            <button className="px-8 py-3.5 bg-slate-950 text-white rounded-[1.2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 italic">
              Sign Up
            </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}