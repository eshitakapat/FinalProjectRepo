"use client";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, Zap, ChevronRight, Smartphone, 
  CreditCard, Building2, ShieldCheck, Stethoscope, Crown 
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global { interface Window { Razorpay: any; } }

// 1. DATA DEFINITIONS (LOCKED)
const PLANS = [
  { id: "bronze", name: "Bronze", price: 299, color: "text-orange-500", bg: "bg-orange-50", features: ["Monthly Skin Scan", "AI Chat Access", "Digital Records"] },
  { id: "silver", name: "Silver", price: 599, color: "text-slate-400", bg: "bg-slate-50", features: ["Everything in Bronze", "1 Specialist Call", "Priority Support"] },
  { id: "premium", name: "Premium", price: 1299, color: "text-yellow-500", bg: "bg-yellow-50", features: ["Unlimited Consults", "Home Lab Samples", "Personal Care Manager"] },
];

const DOCTORS = [
  { 
    id: "as-1", 
    name: "Dr. Ananya Sharma", 
    type: "In-Person", 
    role: "Senior Dermatologist",
    fee: 1200 
  },
  { 
    id: "mv-2", 
    name: "Dr. Marcus Vane", 
    type: "Video", 
    role: "Clinical Pathologist",
    fee: 1000 
  },
  { 
    id: "sp-3", 
    name: "Dr. Sarah Paul", 
    type: "In-Person", 
    role: "Pediatric Dermatologist",
    fee: 900 
  },
  { 
    id: "jw-4", 
    name: "Dr. James Wilson", 
    type: "Video", 
    role: "Aesthetic Consultant",
    fee: 1100 
  }
];

export default function ProfessionalBilling() {
  const [paymentCategory, setPaymentCategory] = useState<"plan" | "consult">("plan");
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const currentTotal = paymentCategory === "plan" ? selectedPlan.price : selectedDoctor.fee;

  const handlePayment = () => {
    if (!window.Razorpay) return alert("Gateway offline. Check connection.");
    setIsLoading(true);

    const options = {
      key: "rzp_test_YOUR_KEY", 
      amount: currentTotal * 100, 
      currency: "INR",
      name: "CareFlow AI",
      description: paymentCategory === "plan" ? `${selectedPlan.name} Subscription` : `Consultation: ${selectedDoctor.name}`,
      handler: (res: any) => {
        setIsLoading(false);
        alert(`Payment Success! ID: ${res.razorpay_payment_id}`);
      },
      prefill: { name: "CareFlow Patient", email: "patient@careflow.com" },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 pt-10 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Checkout <span className="text-blue-600">Secure</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Encrypted Gateway
            </span>
          </div>
        </div>

        {/* CATEGORY SWITCHER */}
        <div className="flex gap-2 p-2 bg-slate-100 rounded-[2rem] w-fit border border-slate-200">
          <button 
            onClick={() => setPaymentCategory("plan")}
            className={cn("px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", 
            paymentCategory === "plan" ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600")}
          >
            <Crown size={14} /> Subscription
          </button>
          <button 
            onClick={() => setPaymentCategory("consult")}
            className={cn("px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", 
            paymentCategory === "consult" ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600")}
          >
            <Stethoscope size={14} /> Consultation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          
          {/* SELECTION AREA */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {paymentCategory === "plan" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "p-10 rounded-[3.5rem] border-4 transition-all cursor-pointer bg-white relative flex flex-col justify-between h-full group",
                      selectedPlan.id === plan.id ? "border-blue-600 shadow-2xl scale-[1.02]" : "border-slate-50 opacity-60 hover:opacity-100"
                    )}
                  >
                    <div>
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", plan.bg, plan.color)}>
                        <Zap size={28} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">{plan.name}</h3>
                      <p className="text-4xl font-black text-slate-900 mt-2 italic">₹{plan.price}</p>
                    </div>
                    <ul className="mt-10 space-y-4 pt-8 border-t border-slate-50">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                          <CheckCircle2 size={16} className="text-blue-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Available Specialists</h2>
                <div className="grid grid-cols-1 gap-4">
                  {DOCTORS.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className={cn(
                        "p-8 rounded-[2.5rem] border-2 flex items-center justify-between cursor-pointer transition-all bg-white",
                        selectedDoctor.id === doc.id ? "border-blue-600 bg-blue-50/20 shadow-xl" : "border-slate-50 hover:border-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black italic text-xl">
                          {doc.name.split(' ')[1][0]}{doc.name.split(' ')[2][0]}
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900 uppercase italic tracking-tighter leading-none">{doc.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{doc.role} • {doc.type}</p>
                        </div>
                      </div>
                      <div className="text-right px-8 border-l border-slate-100">
                        <p className="text-2xl font-black text-blue-600 italic">₹{doc.fee}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Consult Fee</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          
        </div>

        {/* SUMMARY SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="bg-slate-950 text-white p-12 rounded-[4.5rem] sticky top-8 border border-slate-800 shadow-3xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[90px]" />
            
            <h4 className="text-[11px] font-black uppercase opacity-30 mb-12 tracking-[0.4em] italic text-center">Summary</h4>
            
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-end border-b border-slate-800 pb-8">
                <div>
                  <p className="text-[9px] font-black uppercase text-blue-500 tracking-widest mb-1">Product</p>
                  <p className="text-xl font-black italic uppercase leading-none tracking-tighter">
                    {paymentCategory === "plan" ? `${selectedPlan.name} Access` : `Checkup: ${selectedDoctor.name.split(' ')[2]}`}
                  </p>
                </div>
                <span className="font-bold text-slate-400 italic">₹{currentTotal}.00</span>
              </div>

              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                <span>Network Fee</span>
                <span className="text-emerald-400">Waived</span>
              </div>

              <div className="pt-10 flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-2 italic">Grand Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-7xl font-black text-white italic tracking-tighter">₹{currentTotal}</span>
                  <span className="text-blue-600 font-black italic text-xl">.00</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 py-8 rounded-[2.5rem] font-black text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-blue-600/20 mt-8"
              >
                {isLoading ? "INITIALIZING..." : "SECURE PAYMENT"} <ChevronRight size={20} />
              </button>

              <p className="text-center text-[8px] font-bold text-slate-700 uppercase mt-12 tracking-[0.2em] leading-loose">
                Payments Processed by Razorpay Secure Gateway <br /> PCI-DSS Level 1 Certified
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}