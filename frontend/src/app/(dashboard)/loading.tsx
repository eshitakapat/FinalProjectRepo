"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div
      className="min-h-[85vh] w-full p-4 sm:p-6 lg:p-8 space-y-8 relative overflow-hidden bg-slate-50/50"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading CareFlow Dashboard workspace...</span>

      {/* Top Floating Sync Status Indicator */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full text-slate-500 text-[10px] font-black uppercase tracking-widest"
        >
          <Sparkles size={12} className="text-amber-500 animate-pulse" />
          <span>CareFlow AI Syncing Workspace</span>
          <Loader2 size={12} className="animate-spin text-blue-600 ml-1" />
        </motion.div>

        {/* Date / Filter Skeleton Pill */}
        <div className="h-8 w-32 bg-slate-200/70 rounded-full animate-pulse hidden sm:block" />
      </div>

      {/* Hero Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-64 sm:w-80 bg-slate-200/80 rounded-2xl animate-pulse" />
        <div className="h-4 w-48 sm:w-96 bg-slate-200/60 rounded-xl animate-pulse" />
      </div>

      {/* Metrics Summary Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((cardId) => (
          <div
            key={cardId}
            className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse" />
              <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-4 w-28 bg-slate-100 rounded-lg animate-pulse" />
              <div className="h-8 w-36 bg-slate-200/80 rounded-xl animate-pulse" />
            </div>

            <div className="h-3 w-40 bg-slate-100 rounded-lg animate-pulse pt-1" />
          </div>
        ))}
      </div>

      {/* Detailed Content / Data Table Skeleton Section */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        {/* Section Title & Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-2">
            <div className="h-6 w-44 bg-slate-200/80 rounded-xl animate-pulse" />
            <div className="h-3.5 w-60 bg-slate-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-blue-100/60 rounded-2xl animate-pulse" />
        </div>

        {/* Row List Item Skeletons */}
        <div className="space-y-4">
          {[1, 2, 4].map((rowId) => (
            <div
              key={rowId}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100/80 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200/70 rounded-2xl animate-pulse shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-32 sm:w-48 bg-slate-200/80 rounded-lg animate-pulse" />
                  <div className="h-3 w-24 sm:w-36 bg-slate-100 rounded-md animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-7 w-20 bg-slate-200/60 rounded-full animate-pulse hidden sm:block" />
                <div className="w-8 h-8 bg-slate-200/70 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}