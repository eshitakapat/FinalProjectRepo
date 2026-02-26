"use client";
import { Card } from "@/components/ui/Card";
import { Search, Filter, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

const patients = [
  { id: "1", name: "Alex Johnson", age: 24, gender: "Male", lastVisit: "2 days ago", status: "In Treatment" },
  { id: "2", name: "Sarah Miller", age: 31, gender: "Female", lastVisit: "1 week ago", status: "Recovered" },
  { id: "3", name: "Emily Davis", age: 29, gender: "Female", lastVisit: "3 days ago", status: "Follow-up" },
  { id: "4", name: "Mark Thompson", age: 45, gender: "Male", lastVisit: "Yesterday", status: "New" },
];

export default function PatientListPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 font-medium text-sm">Manage and view all clinical records.</p>
        </div>
        <Button className="bg-indigo-600 rounded-xl">Add New Patient</Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/30">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200 gap-2">
              <Filter size={16} /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Age/Gender</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs">
                        {p.name[0]}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {p.age}y / {p.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{p.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}