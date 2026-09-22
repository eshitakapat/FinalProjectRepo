"use client";

import React, { useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Sparkles, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Log exception for telemetry and diagnostic tracking
    console.error("[CareFlow Dashboard Error Boundary Caught]:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-slate-50/50">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100/60 blur-[120px] rounded-full pointer-events-none aria-hidden:true" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10 text-center"
        role="alert"
        aria-live="assertive"
      >
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-red-50 border border-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          <ShieldAlert size={12} className="text-red-500" />
          System Interruption
        </div>

        {/* Warning Icon Display */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-red-100 shadow-lg shadow-red-100/50">
          <AlertTriangle size={36} />
        </div>

        {/* Title and Explanation */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight italic">
          Something Went Wrong
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
          We encountered an unexpected glitch while loading this section of your dashboard. Don&apos;t worry—your data remains secure.
        </p>

        {/* Diagnostic Digest Box (Safe for Production) */}
        {error.digest && (
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-left font-mono text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-sans font-bold text-slate-400 uppercase tracking-wider text-[9px]">
              Error Digest Code
            </span>
            <span className="font-bold text-slate-700">{error.digest}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className={cn(
              "w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300",
              isPending && "opacity-75 cursor-not-allowed"
            )}
          >
            <RefreshCw
              size={16}
              className={cn("transition-transform", isPending && "animate-spin")}
            />
            <span>{isPending ? "Retrying..." : "Try Again"}</span>
          </button>

          <button
            type="button"
            onClick={handleNavigateHome}
            className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Home size={16} />
            <span>Go Home</span>
          </button>
        </div>

        {/* Footer Support Prompt */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <Sparkles size={14} className="text-amber-500" />
          <span>CareFlow AI Automated Health Monitoring</span>
        </div>
      </motion.div>
    </div>
  );
}