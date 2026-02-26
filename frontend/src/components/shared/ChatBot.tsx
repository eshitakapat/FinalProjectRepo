"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, AlertCircle, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

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

export default function ChatBot({ 
  role, 
  capturedImage, 
  patientData 
}: { 
  role: string; 
  capturedImage?: string | null;
  patientData?: PatientContext;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: `Hello! I'm your CareBuddy AI. I've loaded your ${patientData?.skinType || 'clinical'} profile. How can I help you today?`, 
      sender: 'bot' 
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

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
    const currentInput = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    // AI Response Logic
    setTimeout(() => {
      let responseText = "I'm analyzing that based on your medical history. Could you tell me if this is a new symptom?";
      let isAlert = false;

      // 1. Allergy Safety Check
      if (patientData?.allergies && currentInput.match(new RegExp(patientData.allergies.replace(/, /g, "|"), "i"))) {
        responseText = `⚠️ SAFETY ALERT: Your profile lists an allergy to elements in that request (${patientData.allergies}). Please avoid contact and consult Dr. Sharma immediately.`;
        isAlert = true;
      } 
      // 2. Skin Type Personalization
      else if (currentInput.includes("routine") || currentInput.includes("wash") || currentInput.includes("soap")) {
        responseText = patientData?.skinType === "Oily" 
          ? "For your Oily skin type, I recommend a salicylic acid-based cleanser. Avoid heavy oils which might trigger the current redness."
          : "Since you have Dry/Sensitive skin, stick to fragrance-free cream cleansers to maintain your moisture barrier.";
      }
      // 3. Image Context
      else if (currentInput.includes("look") || currentInput.includes("this") || currentInput.includes("scan")) {
        responseText = capturedImage 
          ? "I am analyzing the scan you just took. I see localized erythema (redness). I've sent these metrics to the clinical queue for review."
          : "I don't see a current scan. Please use the 'New Scan' button so I can analyze the area for you.";
      }
      // 4. Symptoms
      else if (currentInput.includes("itchy") || currentInput.includes("burn")) {
        responseText = "I've logged this discomfort. Applying a cool compress may provide temporary relief until your doctor reviews the AI scan metrics.";
      }

      const botMsg: Message = { id: Date.now() + 1, text: responseText, sender: "bot", isAlert };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

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
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={60}/></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">CareBuddy AI</p>
                  <p className="text-[10px] text-indigo-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Active • {patientData?.skinType || 'Standard'} Mode
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
                    "max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-none" 
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
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
               {["Scan Help", "Allergies", "Schedule"].map(label => (
                 <button 
                  key={label}
                  onClick={() => { setInput(label); handleSend(); }}
                  className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-full text-[10px] font-bold text-slate-500 transition-colors"
                 >
                   {label}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your skin..."
                  className="w-full p-4 pr-12 bg-slate-50 rounded-2xl text-xs font-bold border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="absolute right-2 p-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-md">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border-4 border-white"
      >
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full border-4 border-white flex items-center justify-center">
          <Activity size={10} className="text-white" />
        </div>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}