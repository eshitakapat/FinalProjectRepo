"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
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
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole !== "patient") {
      setError("Registration allowed only for patients.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      router.push("/patient");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className={cn(
            "absolute top-[-10%] right-[-10%] w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 opacity-30",
            selectedRole === "patient"
              ? "bg-blue-200"
              : selectedRole === "doctor"
              ? "bg-indigo-200"
              : "bg-slate-200"
          )}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white shadow-sm border border-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles size={12} className="text-amber-500" />
            CareFlow Secure Registration
          </motion.div>

          <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter italic">
            Create Account
          </h1>

          <p className="text-slate-500 font-medium">
            Select your portal to begin
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedRole(role.id);
                setError("");
              }}
              className={cn(
                "p-8 rounded-[2.5rem] transition-all duration-500 text-left relative overflow-hidden group border-4",
                selectedRole === role.id
                  ? "border-blue-600 bg-white shadow-2xl shadow-blue-100/50"
                  : "border-transparent bg-white shadow-sm hover:shadow-xl hover:border-slate-100"
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-all duration-500 group-hover:rotate-[10deg] shadow-lg",
                  role.color
                )}
              >
                <role.icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {role.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                {role.desc}
              </p>

              <div
                className={cn(
                  "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300",
                  selectedRole === role.id
                    ? `${role.accent} opacity-100 translate-x-0`
                    : "opacity-0 -translate-x-4"
                )}
              >
                Selected Workspace <ArrowRight size={14} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Registration Form */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Authorized Entry
                  </p>
                  <p className="text-lg font-bold text-slate-700 capitalize">
                    {selectedRole} Registration
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-sm outline-none"
                  />

                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-sm outline-none"
                  />
                </div>

                <button
                  disabled={loading}
                  className={cn(
                    "w-full py-5 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-3 shadow-xl",
                    roles.find((r) => r.id === selectedRole)?.color,
                    roles.find((r) => r.id === selectedRole)?.hoverColor,
                    loading && "opacity-80 cursor-not-allowed scale-95"
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                <p className="text-center text-[10px] text-slate-400 font-medium">
                  By entering, you agree to CareFlow’s{" "}
                  <span className="underline">Security Protocols</span>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}