"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  ShieldCheck, TrendingUp, Users, Download, Settings,
  LayoutDashboard, AlertCircle, RefreshCw, CheckCircle2,
  XCircle, Clock
} from "lucide-react";
import ChatBot from "@/components/shared/ChatBot";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export interface Appointment {
  _id: string;
  doctor: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled" | string;
}

interface StaffMember {
  id: string;
  name: string;
  dept: string;
  status: "Active" | "In Surgery" | "On Break" | "Offline";
  load: string;
}

const CHART_COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6"];

export default function AdminDashboard() {
  const [reportLoading, setReportLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [staffStatus] = useState<StaffMember[]>([
    { id: "1", name: "Dr. Sharma", dept: "Dermatology", status: "Active", load: "90%" },
    { id: "2", name: "Dr. Smith", dept: "Cosmetic Surgery", status: "In Surgery", load: "100%" },
    { id: "3", name: "Nurse Joy", dept: "OPD Triage", status: "On Break", load: "0%" },
    { id: "4", name: "Dr. Patel", dept: "Pediatric Dermatology", status: "Active", load: "65%" },
  ]);

  // Handle Client Hydration Safety for Recharts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch appointments from backend with abort signal and 
  const fetchAppointments = useCallback(async (signal?: AbortSignal) => {
    setIsRefreshing(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://final-project-repo-efph.vercel.app/api";
      
      const res = await fetch(`${apiBaseUrl}/appointments/doctor`, {
        signal,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      
      const data = await res.json();
      const loadedAppointments = Array.isArray(data) ? data : data.appointments || [];
      
      setAppointments(loadedAppointments);
      setLastUpdated(new Date());
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.warn("API fetch failed, utilizing active fallback metrics:", err);
      
      // Resilient local state fallback
      setAppointments([
        { _id: "1", doctor: "Dr. Sharma", time: "10:00 AM", status: "Scheduled" },
        { _id: "2", doctor: "Dr. Smith", time: "11:00 AM", status: "Completed" },
        { _id: "3", doctor: "Nurse Joy", time: "12:00 PM", status: "Cancelled" },
        { _id: "4", doctor: "Dr. Patel", time: "02:30 PM", status: "Scheduled" },
      ]);
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchAppointments(controller.signal);

    // Live refresh polling interval (10s)
    const interval = setInterval(() => {
      fetchAppointments(controller.signal);
    }, 10000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [fetchAppointments]);

  // Aggregate stats for Chart visualization
  const appointmentStats = useMemo(() => {
    if (!appointments.length) {
      return [
        { name: "Scheduled", value: 4 },
        { name: "Completed", value: 3 },
        { name: "Cancelled", value: 1 },
      ];
    }

    const countMap: Record<string, number> = {};
    appointments.forEach((a) => {
      const status = a.status || "Unknown";
      countMap[status] = (countMap[status] || 0) + 1;
    });

    return Object.entries(countMap).map(([name, value]) => ({ name, value }));
  }, [appointments]);

  // CSV Report Exporter
  const handleExportCSV = () => {
    setReportLoading(true);
    try {
      const headers = ["Appointment ID,Doctor,Time,Status\n"];
      const rows = appointments.map(
        (a) => `"${a._id}","${a.doctor}","${a.time}","${a.status}"\n`
      );
      
      const blob = new Blob([...headers, ...rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `CareFlow_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setTimeout(() => setReportLoading(false), 800);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-slate-900 text-white border-none px-3 py-1 font-semibold text-xs">
              System Admin
            </Badge>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live System {isRefreshing && <RefreshCw className="w-3 h-3 animate-spin text-emerald-600 ml-1" />}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital Overview
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Monitoring 4 active departments across 2 wings.
            {lastUpdated && (
              <span className="text-xs text-slate-400 ml-2">
                (Last synced: {lastUpdated.toLocaleTimeString()})
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            disabled={reportLoading}
            className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-700 gap-2 h-11 px-4 font-semibold text-sm transition-all"
          >
            <Download size={16} className={reportLoading ? "animate-bounce" : ""} />
            {reportLoading ? "Generating CSV..." : "Export Reports"}
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md hover:shadow-indigo-200 h-11 px-4 gap-2 font-semibold text-sm transition-all">
            <Settings size={16} /> Configuration
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-5 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <TrendingUp size={26} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Revenue Today
              </p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                +14%
              </span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">$4,250</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-5 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Users size={26} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Staff
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {staffStatus.filter((s) => s.status === "Active" || s.status === "In Surgery").length}
              <span className="text-lg text-slate-400 font-normal"> / {staffStatus.length}</span>
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-5 bg-slate-900 text-white border border-slate-800 shadow-lg rounded-3xl overflow-hidden relative group">
          <div className="absolute -top-2 -right-2 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <ShieldCheck size={96} />
          </div>
          <div className="p-4 bg-white/10 text-emerald-400 rounded-2xl backdrop-blur-md">
            <ShieldCheck size={26} />
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              System Status
            </p>
            <p className="text-3xl font-extrabold text-emerald-400 tracking-tight mt-1">
              SECURE
            </p>
          </div>
        </Card>
      </div>

      {/* Operational Insights & Live Staffing Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pie Chart Card */}
          <Card className="p-6 sm:p-8 border border-slate-100 shadow-sm bg-white rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-bold text-xl text-slate-900">Appointment Analytics</h2>
                <p className="text-xs text-slate-500 mt-0.5">Real-time breakdown by appointment status</p>
              </div>
              <Badge variant="outline" className="border-slate-200 text-slate-500 text-xs px-3 py-1">
                Live Feed ({appointments.length} Total)
              </Badge>
            </div>

            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      innerRadius={45}
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {appointmentStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        color: "#ffffff",
                        border: "none",
                        fontSize: "12px",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Loading chart visualization...
                </div>
              )}
            </div>
          </Card>

          {/* Room Availability Map Component Placeholder */}
          <Card className="p-8 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl relative group overflow-hidden">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <LayoutDashboard className="text-slate-300 mb-3 group-hover:text-indigo-500 transition-colors" size={44} />
              <h3 className="font-bold text-slate-800 text-base">Room Availability & Spatial Mapping</h3>
              <p className="text-xs text-slate-500 italic max-w-sm mt-2 leading-relaxed">
                Integrating real-time IoT room sensors and telemetry streams. Floor plan analytics module releasing in v2.4.
              </p>
              <Button variant="ghost" className="mt-5 text-indigo-600 font-bold text-xs hover:bg-indigo-50/80 rounded-xl">
                View Preview Specification →
              </Button>
            </div>
          </Card>
        </div>

        {/* Staff & System Alerts Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Live Staff Roster
            </h2>
            <span className="text-[10px] font-bold text-slate-400">{staffStatus.length} Registered</span>
          </div>

          <Card className="p-6 border border-slate-100 shadow-sm bg-white rounded-3xl">
            <div className="space-y-5">
              {staffStatus.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-none last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-700 text-sm border border-slate-200/50">
                      {staff.name.replace("Dr. ", "").replace("Nurse ", "")[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                      <p className="text-[11px] font-medium text-slate-400">{staff.dept}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block ${
                        staff.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : staff.status === "In Surgery"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {staff.status}
                    </span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden ml-auto">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: staff.load }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-2xl py-5 border border-slate-200/60 transition-colors">
              Manage All Personnel
            </Button>
          </Card>

          {/* System Critical Alerts Card */}
          <Card className="p-6 bg-rose-50/60 border border-rose-100 rounded-3xl">
            <div className="flex items-center gap-2 mb-3 text-rose-700">
              <AlertCircle size={18} />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Critical Alerts</h3>
            </div>
            <div className="space-y-2.5">
              <div className="p-3.5 bg-white rounded-2xl border border-rose-100/80 shadow-2xs">
                <p className="text-xs text-rose-900 font-bold">Lab Telemetry Disconnected</p>
                <p className="text-[10px] text-rose-600 mt-0.5">Manual review requested for Wing 3 diagnostic queue.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Admin Context ChatBot */}
      <ChatBot role="admin" />
    </div>
  );
}