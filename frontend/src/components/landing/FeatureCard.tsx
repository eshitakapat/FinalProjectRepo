"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FeatureCard({ details }: { details: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = details.icon;

  return (
    <>
      <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900">{details.title}</h3>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 rounded-lg text-slate-500">{details.tag}</span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8">{details.description}</p>

        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
        >
          Learn More <ArrowRight size={16} />
        </button>
      </div>

      {/* Professional Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-blue-600 p-8 text-white relative">
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
                <h2 className="text-3xl font-black mb-2">{details.title}</h2>
                <p className="text-blue-100 font-medium">{details.tagline}</p>
              </div>
              
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed mb-8">{details.content}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700">
                      <CheckCircle2 size={16} className="text-blue-600" /> {feat}
                    </div>
                  ))}
                </div>
                <Button onClick={() => setIsOpen(false)} className="w-full mt-8 bg-slate-900 py-6 rounded-2xl">
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}