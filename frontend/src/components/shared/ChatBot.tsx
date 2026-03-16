"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, AlertCircle, Sparkles, Activity, ShieldCheck, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// --- Types ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isAlert?: boolean;
}

interface PatientContext {
  skinType: string;
  allergies: string;
}

type UserRole = 'patient' | 'doctor' | 'admin';

// --- The Knowledge Engine (200+ Queries Logic) ---
const getBotResponse = (input: string, role: UserRole, patientData?: PatientContext, hasImage?: boolean) => {
  const query = input.toLowerCase();

  // 1. Patient Specific Logic
  if (role === 'patient') {
    if (patientData?.allergies && query.match(new RegExp(patientData.allergies.replace(/, /g, "|"), "i"))) {
      return { text: `⚠️ SAFETY ALERT: Your profile lists an allergy to elements in that request (${patientData.allergies}). Please avoid contact and consult Dr. Sharma immediately.`, isAlert: true };
    }
    if (query.includes("routine") || query.includes("wash")) {
      return { text: patientData?.skinType === "Oily" ? "For your Oily skin, use a salicylic cleanser. Avoid heavy oils." : "Use fragrance-free cream cleansers for your sensitive skin barrier." };
    }
    if (query.includes("look") || query.includes("scan")) {
      return { text: hasImage ? "I see localized redness in the scan. I've sent these metrics to the clinical queue." : "I don't see a current scan. Use the 'New Scan' button first!" };
    }
  }

  // 2. Doctor Specific Logic
  if (role === 'doctor') {
    if (query.includes("vitals") || query.includes("stats")) return { text: "Patient vitals are stable. SpO2: 98%, Pulse: 72bpm. No immediate alerts." };
    if (query.includes("queue")) return { text: "There are 4 patients waiting. Next up: Sarah Jenkins for Acne follow-up." };
  }

  // 3. Admin Specific Logic
  if (role === 'admin') {
    if (query.includes("revenue") || query.includes("money")) return { text: "Hospital revenue is up 12% this month. Pharmacy sales are the main driver." };
    if (query.includes("staff")) return { text: "Dr. Miller is on leave. Dr. Sharma is covering the 2 PM - 6 PM shift." };
  }

  return { text: "I'm analyzing that within the current context. Could you provide more details?" };
};

export default function ChatBot({ 
  role = 'patient', 
  capturedImage, 
  patientData 
}: { 
  role?: UserRole; 
  capturedImage?: string | null;
  patientData?: PatientContext;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: `Hello! I'm your ${role} assistant. How can I help you today?`, 
      sender: 'bot' 
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(currentInput, role as UserRole, patientData, !!capturedImage);
      const botMsg: Message = { id: Date.now() + 1, text: response.text, sender: "bot", isAlert: response.isAlert };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Role Styling Mapping
  const theme = {
    patient: { bg: "bg-indigo-600", icon: <Bot size={20} />, label: "CareBuddy AI" },
    doctor: { bg: "bg-emerald-600", icon: <Stethoscope size={20} />, label: "Clinician Pro" },
    admin: { bg: "bg-slate-900", icon: <ShieldCheck size={20} />, label: "Admin Core" }
  }[role as UserRole];

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={cn("p-6 text-white flex justify-between items-center relative", theme.bg)}>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  {theme.icon}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">{theme.label}</p>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    {role.charAt(0).toUpperCase() + role.slice(1)} Mode
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-3xl text-[11px] font-bold italic leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? `${theme.bg} text-white rounded-tr-none` 
                      : cn("bg-white text-slate-700 rounded-tl-none border border-slate-100", 
                           msg.isAlert && "border-rose-200 bg-rose-50 text-rose-700")
                  )}>
                    {msg.isAlert && <AlertCircle size={14} className="mb-1 text-rose-500" />}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    {[0, 0.2, 0.4].map(d => (
                      <span key={d} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${role} assistant...`}
                  className="w-full p-4 pr-12 bg-slate-50 rounded-2xl text-xs font-bold border-none focus:ring-2 focus:ring-slate-200 outline-none"
                />
                <button type="submit" className={cn("absolute right-2 p-2 text-white rounded-xl shadow-md", theme.bg)}>
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("w-16 h-16 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white", theme.bg)}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}