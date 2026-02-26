"use client";
import React, { useState } from "react";
// Replace these with your actual UI components path
const Card = ({ children, className }: any) => <div className={`bg-white rounded-3xl ${className}`}>{children}</div>;
const Button = ({ children, onClick, className, variant }: any) => (
  <button onClick={onClick} className={`transition-all active:scale-95 disabled:opacity-50 ${className}`}>{children}</button>
);

import { 
  Droplets, Sun, Sparkles, Plus, 
  CheckCircle2, Clock, ShieldCheck,
  TrendingUp, Maximize2, Calendar, 
  ArrowLeftRight, MessageCircle, Send, X, AlertCircle, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkinHealthTab() {
  const [sliderVal, setSliderVal] = useState(50);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Patient Conditions State
  const [conditions, setConditions] = useState([
    { id: 1, name: "Contact Dermatitis", type: "Diagnosed", severity: "Mild" },
    { id: 2, name: "Occasional Acne", type: "Self-Observed", severity: "Moderate" }
  ]);
  const [newCondition, setNewCondition] = useState("");

  const routine = [
    { time: "Morning", task: "Gentle Cleanser", product: "Cerave Hydrating", status: "Done" },
    { time: "Morning", task: "Vitamin C Serum", product: "Skinceuticals CE", status: "Pending" },
    { time: "Evening", task: "Retinol 0.5%", product: "SkinBetter Science", status: "Locked" },
  ];

  const addCondition = () => {
    if (!newCondition) return;
    setConditions([...conditions, { id: Date.now(), name: newCondition, type: "Self-Observed", severity: "New" }]);
    setNewCondition("");
  };

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto pb-32 relative">
      
      {/* 1. ENVIRONMENTAL & VITAL SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-none relative overflow-hidden">
          <Sun className="absolute -top-4 -right-4 text-orange-200" size={120} />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">UV Index Today</p>
            <h2 className="text-4xl font-black text-slate-900 mt-2">High (7)</h2>
            <p className="text-xs font-medium text-orange-700 mt-2">SPF 50+ Required.</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-none relative overflow-hidden">
          <Droplets className="absolute -top-4 -right-4 text-blue-200" size={120} />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Skin Hydration</p>
            <h2 className="text-4xl font-black text-slate-900 mt-2">68%</h2>
            <div className="w-full h-1.5 bg-blue-100 rounded-full mt-4">
              <div className="h-full bg-blue-500 w-[68%] rounded-full" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white border-none">
          <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Health Score</p>
          <h2 className="text-4xl font-black mt-2 tracking-tighter italic">82/100</h2>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-400" /> +4% from last week
          </p>
        </Card>
      </div>

      {/* 2. PATIENT CONDITIONS (Dynamic Section) */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h3 className="text-xl font-black text-slate-900 italic">Active Conditions</h3>
           <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add condition..." 
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ring-indigo-100"
              />
              <Button onClick={addCondition} className="bg-indigo-600 text-white p-2 rounded-xl">
                <Plus size={18} />
              </Button>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((c) => (
            <Card key={c.id} className="p-5 border border-slate-100 shadow-sm flex justify-between items-center group">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={14} className={c.type === "Diagnosed" ? "text-indigo-500" : "text-amber-500"} />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{c.type}</span>
                </div>
                <h4 className="font-bold text-slate-900">{c.name}</h4>
              </div>
              <button 
                onClick={() => setConditions(conditions.filter(item => item.id !== c.id))}
                className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. VISUAL PROGRESS */}
      <Card className="p-8 bg-white border-none shadow-sm rounded-[3rem] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 italic">Visual Progress</h3>
            <p className="text-xs text-slate-500 font-medium">Comparing Baseline vs Today</p>
          </div>
          <Button className="rounded-xl border border-slate-100 text-xs font-bold gap-2 px-4 py-2 flex items-center">
            <Maximize2 size={14} /> Fullscreen
          </Button>
        </div>

        <div className="relative aspect-video rounded-[2rem] overflow-hidden group border-4 border-slate-50">
          <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover" alt="After" />
          <div className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white shadow-2xl" style={{ width: `${sliderVal}%` }}>
            <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-[1200px] h-full object-cover grayscale-[0.3]" alt="Before" />
            <div className="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Baseline</div>
          </div>
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Current</div>
          <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
          <div className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
              <ArrowLeftRight size={14} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </Card>

      {/* 4. CHAT BOT BUTTON & INTERFACE */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-200 flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isChatOpen ? <X /> : <MessageCircle size={28} />}
        </Button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-6 bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Glow AI Concierge</h4>
                    <p className="text-[10px] text-indigo-100 opacity-80 uppercase tracking-widest font-black">Clinical Assistant</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-600 leading-relaxed border border-slate-100 max-w-[85%]">
                  Hello! I've analyzed your **UV Index** and **Routine**. You should apply your Vitamin C serum now for maximum protection. How can I help?
                </div>
                <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none shadow-sm text-xs text-white ml-auto max-w-[85%] font-medium">
                  Is it okay to use Retinol if I have slight redness today?
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about ingredients or routine..." 
                  className="flex-1 text-xs bg-slate-50 rounded-xl px-4 py-3 focus:outline-none"
                />
                <Button className="bg-slate-900 text-white p-3 rounded-xl">
                  <Send size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* REMAINDER OF YOUR SECTIONS (Routine, AI Insights, etc.) */}
      {/* ... keeping your original daily regimen and education library logic below ... */}
    </div>
  );
}