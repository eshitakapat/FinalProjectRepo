"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type UserRole = "patient" | "doctor" | "admin";

interface RoleConfig {
  id: UserRole;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  accent: string;
  borderColor: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  message?: string;
}

const ROLES: RoleConfig[] = [
  {
    id: "patient",
    title: "Patient",
    desc: "Book appointments & track skin progress",
    icon: User,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    accent: "text-blue-500",
    borderColor: "border-blue-600",
  },
  {
    id: "doctor",
    title: "Doctor",
    desc: "Manage patients & clinical records",
    icon: Stethoscope,
    color: "bg-indigo-600",
    hoverColor: "hover:bg-indigo-700",
    accent: "text-indigo-600",
    borderColor: "border-indigo-600",
  },
  {
    id: "admin",
    title: "Admin",
    desc: "Hospital operations & staff management",
    icon: ShieldCheck,
    color: "bg-slate-900",
    hoverColor: "hover:bg-black",
    accent: "text-slate-900",
    borderColor: "border-slate-900",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (error) setError("");
    },
    [error]
  );

  const handleRoleSelect = (roleId: UserRole) => {
    setSelectedRole(roleId);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoggingIn) return;

    if (!selectedRole) {
      setError("Please select your workspace role before logging in.");
      return;
    }

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
      
      // Fallback endpoint logic ensuring backward compatibility
      const endpoint = `${baseUrl}/${selectedRole}/login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Invalid credentials. Please try again."
        );
      }

      // Secure local storage persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (selectedRole === "patient" && data.user?.id) {
          localStorage.setItem("patientId", data.user.id);
        }
      }

      // Role-based redirection routing
      const targetRoute = `/${selectedRole}`;
      router.push(targetRoute);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected network error occurred. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const activeRoleConfig = ROLES.find((r) => r.id === selectedRole);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none aria-hidden:true">
        <div
          className={cn(
            "absolute top-[-10%] right-[-10%] w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 opacity-30",
            selectedRole === "patient"
              ? "bg-blue-300"
              : selectedRole === "doctor"
              ? "bg-indigo-300"
              : selectedRole === "admin"
              ? "bg-slate-400"
              : "bg-blue-200"
          )}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header Section */}
        <header className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white shadow-sm border border-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles size={12} className="text-amber-500" />
            CareFlow AI Secure Portal
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tighter italic">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Select your workspace to access your clinical dashboard
          </p>
        </header>

        {/* Role Selection Cards Grid */}
        <section
          aria-label="Select User Role"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            const IconComponent = role.icon;

            return (
              <motion.button
                key={role.id}
                type="button"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect(role.id)}
                aria-pressed={isSelected}
                className={cn(
                  "p-6 sm:p-8 rounded-[2.5rem] transition-all duration-300 text-left relative overflow-hidden group border-4 outline-none focus-visible:ring-4 focus-visible:ring-blue-400",
                  isSelected
                    ? `${role.borderColor} bg-white shadow-2xl shadow-blue-100/60`
                    : "border-transparent bg-white shadow-sm hover:shadow-xl hover:border-slate-200"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-500 group-hover:rotate-[8deg] shadow-md",
                    role.color
                  )}
                >
                  <IconComponent size={26} />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  {role.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                  {role.desc}
                </p>

                <div
                  className={cn(
                    "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300",
                    isSelected
                      ? `${role.accent} opacity-100 translate-x-0`
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  )}
                >
                  Selected Workspace <ArrowRight size={14} />
                </div>
              </motion.button>
            );
          })}
        </section>

        {/* Interactive Login Form */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 sm:mt-12 max-w-md mx-auto bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border border-slate-100"
            >
              <form onSubmit={handleLogin} noValidate className="space-y-5">
                <div className="text-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Authorized Access
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-800 capitalize">
                    {selectedRole} Authentication
                  </p>
                </div>

                {/* Accessible Live Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="alert"
                    aria-live="assertive"
                    className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-xs sm:text-sm font-semibold"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {/* Email Input Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoggingIn}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-semibold text-sm text-slate-900 outline-none disabled:opacity-60"
                      placeholder="name@careflow.ai"
                    />
                  </div>

                  {/* Password Input Field with Toggle */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoggingIn}
                        className="w-full p-4 pr-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-semibold text-sm text-slate-900 outline-none disabled:opacity-60"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={cn(
                    "w-full py-4 sm:py-5 rounded-2xl text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-3 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300",
                    activeRoleConfig?.color,
                    activeRoleConfig?.hoverColor,
                    isLoggingIn && "opacity-80 cursor-not-allowed scale-[0.99]"
                  )}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Log In</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}