"use client";
import React from "react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* CUTE GRAPHIC BLOBS - Decorative Background */}
      <div className="absolute top-20 left-[-5%] w-72 h-72 bg-blue-200/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-[-5%] w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-5xl mx-auto text-center z-10">
        
        {/* CENTERED BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 italic">
              ✨ Trusted by 500+ clinics worldwide
            </span>
          </div>
        </motion.div>
        
        {/* CENTERED HEADING - Professional Bold Italic */}
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 mb-8 leading-[0.9] uppercase">
          Healthcare <br />
          <span className="text-blue-600">Reimagined.</span>
        </h1>

        {/* CENTERED SUBTEXT */}
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed italic">
          The all-in-one workspace for modern medical practices. Manage patient flows, 
          diagnostics, and schedules with an interface your team will actually love.
        </p>

        {/* CENTERED SINGLE BUTTON - No Demo Button */}
        <div className="flex flex-col items-center gap-6 justify-center">
          <Link href="/login">
            <Button className="h-20 px-16 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 font-black text-xs uppercase tracking-[0.2em] italic flex items-center gap-3">
              Get Started Now <ChevronRight size={18} />
            </Button>
          </Link>
          
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
            Secure • Professional • Cloud-Based
          </p>
        </div>

        {/* MOCKUP AREA DELETED AS REQUESTED */}
      </div>
    </section>
  );
}