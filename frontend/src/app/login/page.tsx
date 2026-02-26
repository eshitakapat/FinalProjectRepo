"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Stethoscope, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "patient",
    title: "Patient",
    desc: "Book appointments & track skin progress",
    icon: User,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    accent: "text-blue-500",
  },
  {
    id: "doctor",
    title: "Doctor",
    desc: "Manage patients & clinical records",
    icon: Stethoscope,
    color: "bg-indigo-600",
    hoverColor: "hover:bg-indigo-700",
    accent: "text-indigo-600",
  },
  {
    id: "admin",
    title: "Admin",
    desc: "Hospital operations & staff management",
    icon: ShieldCheck,
    color: "bg-slate-900",
    hoverColor: "hover:bg-black",
    accent: "text-slate-900",
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoggingIn(true);
    
    // Simulate authentication delay for a "premium" feel
    setTimeout(() => {
      router.push(`/${selectedRole}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 ${selectedRole === 'patient' ? 'bg-blue-200' : selectedRole === 'doctor' ? 'bg-indigo-200' : 'bg-slate-200'} opacity-30`} />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white shadow-sm border border-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles size={12} className="text-amber-500" /> CareFlow Secure Access
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter italic">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Select your portal to manage your health workflow</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "p-8 rounded-[2.5rem] transition-all duration-500 text-left relative overflow-hidden group border-4",
                selectedRole === role.id 
                  ? "border-blue-600 bg-white shadow-2xl shadow-blue-100/50" 
                  : "border-transparent bg-white shadow-sm hover:shadow-xl hover:border-slate-100"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-all duration-500 group-hover:rotate-[10deg] shadow-lg",
                role.color
              )}>
                <role.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{role.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{role.desc}</p>
              
              <div className={cn(
                "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300",
                selectedRole === role.id ? `${role.accent} opacity-100 translate-x-0` : "opacity-0 -translate-x-4"
              )}>
                Selected Workspace <ArrowRight size={14} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Login Form */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div 
              key={selectedRole}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100"
            >
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Entry</p>
                  <p className="text-lg font-bold text-slate-700 capitalize">{selectedRole} Authentication</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-sm outline-none" 
                      placeholder={`name@${selectedRole}.careflow.com`} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Access Key</label>
                    <input 
                      required 
                      type="password" 
                      className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-sm outline-none" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
                
                <button 
                  disabled={isLoggingIn}
                  className={cn(
                    "w-full py-5 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-3 shadow-xl",
                    roles.find(r => r.id === selectedRole)?.color,
                    roles.find(r => r.id === selectedRole)?.hoverColor,
                    isLoggingIn && "opacity-80 cursor-not-allowed scale-95"
                  )}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Decrypting...
                    </>
                  ) : (
                    <>Initialize Session <ArrowRight size={18} /></>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-slate-400 font-medium">
                  By entering, you agree to CareFlow’s <span className="underline">Security Protocols</span>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}