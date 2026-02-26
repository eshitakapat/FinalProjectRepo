"use client";
import { useState } from "react";
import { User, Bell, Shield, Moon, CreditCard, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 font-medium">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 space-y-2">
          <SettingsTab 
            icon={<User size={18} />} 
            label="Profile" 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")} 
          />
          <SettingsTab 
            icon={<Bell size={18} />} 
            label="Notifications" 
            active={activeTab === "notifications"} 
            onClick={() => setActiveTab("notifications")} 
          />
          <SettingsTab 
            icon={<Shield size={18} />} 
            label="Security" 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")} 
          />
        </aside>

        {/* Settings Content Area */}
        <div className="flex-1">
          <Card className="p-8 border-none shadow-sm bg-white">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white shadow-sm">
                    JD
                  </div>
                  <div>
                    <Button size="sm" variant="outline">Change Photo</Button>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">JPG, GIF or PNG. Max size of 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Full Name" placeholder="John Doe" />
                  <InputGroup label="Email Address" placeholder="john@careflow.com" />
                  <InputGroup label="Phone Number" placeholder="+1 (555) 000-0000" />
                  <InputGroup label="Timezone" placeholder="Pacific Standard Time" />
                </div>
                
                <div className="pt-6 border-t border-slate-50">
                  <Button className="bg-blue-600 gap-2">
                    <Save size={18} /> Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="font-bold text-slate-900">Email Notifications</h3>
                <div className="space-y-4">
                  <ToggleGroup label="Appointment Reminders" description="Get notified about upcoming skin consultations." />
                  <ToggleGroup label="Medical Reports" description="Receive a notification when a new lab report is ready." />
                  <ToggleGroup label="Marketing" description="Receive updates on new skincare treatments and offers." />
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function SettingsTab({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        active ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function InputGroup({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
      />
    </div>
  );
}

function ToggleGroup({ label, description }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="w-10 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
        <div className="w-4 h-4 bg-white rounded-full ml-auto" />
      </div>
    </div>
  );
}