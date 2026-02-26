"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2, Zap, ChevronRight, Smartphone, CreditCard, Building2 } from "lucide-react";

declare global { interface Window { Razorpay: any; } }

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpay = () => {
    const amount = selectedPlan === "Pro" ? 49900 : 99900;
    if (!window.Razorpay) { alert("Razorpay SDK not loaded. Check connection."); return; }

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your rzp_test_... key
      amount: amount,
      currency: "INR",
      name: "CareFlow AI",
      description: `${selectedPlan} Plan Subscription`,
      handler: (res: any) => alert("Payment Success! ID: " + res.razorpay_payment_id),
      prefill: { name: "CareFlow User", email: "user@careflow.com" },
      theme: { color: "#2563eb" },
    };
    new window.Razorpay(options).open();
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Subscription <span className="text-blue-600">Plans</span></h1>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 italic">Professional Billing Portal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          
          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Pro", "Premium"].map((plan) => (
              <div key={plan} onClick={() => setSelectedPlan(plan)}
                className={`p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer bg-white min-h-[380px] flex flex-col justify-between ${
                  selectedPlan === plan ? 'border-blue-600 shadow-2xl scale-[1.01]' : 'border-slate-100 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                    <Zap size={28} fill={selectedPlan === plan ? "currentColor" : "none"} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic">{plan} Plan</h3>
                  <p className="text-5xl font-black text-slate-900 mt-4 italic tracking-tighter">₹{plan === "Pro" ? "499" : "999"}<span className="text-sm font-bold text-slate-300 ml-1">/mo</span></p>
                </div>
                <div className="space-y-3 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-500"><CheckCircle2 size={16} className="text-blue-600"/> Unlimited AI Diagnostics</div>
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-500"><CheckCircle2 size={16} className="text-blue-600"/> Priority Lab Access</div>
                </div>
              </div>
            ))}
          </div>

          {/* PAYMENT METHODS */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "upi", name: "UPI / PhonePe", icon: <Smartphone size={24} /> },
              { id: "card", name: "Debit / Credit", icon: <CreditCard size={24} /> },
              { id: "net", name: "Net Banking", icon: <Building2 size={24} /> }
            ].map((m) => (
              <button key={m.id} onClick={handleRazorpay}
                className="flex flex-col items-center justify-center gap-4 p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-xl transition-all group shadow-sm"
              >
                <div className="text-slate-300 group-hover:text-blue-600 transition-colors">{m.icon}</div>
                <span className="text-[10px] font-black uppercase text-slate-600 tracking-tight">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY BOX */}
        <div className="lg:col-span-4">
          <div className="bg-slate-950 text-white p-10 rounded-[3.5rem] shadow-2xl sticky top-4 border border-slate-800">
            <h4 className="text-[10px] font-black uppercase opacity-40 mb-10 tracking-widest italic">Order Summary</h4>
            <div className="space-y-6 mb-12 border-b border-slate-800 pb-8 uppercase text-[11px] font-bold">
              <div className="flex justify-between opacity-70"><span>{selectedPlan} Subscription</span><span>₹{selectedPlan === "Pro" ? "499" : "999"}</span></div>
              <div className="flex justify-between opacity-70"><span>Tax (GST 18%)</span><span>₹{selectedPlan === "Pro" ? "89.82" : "179.82"}</span></div>
              <div className="pt-6 flex flex-col">
                <span className="text-[10px] opacity-30 tracking-widest mb-1">Grand Total</span>
                <span className="text-5xl font-black text-blue-400 italic tracking-tighter">₹{selectedPlan === "Pro" ? "588.82" : "1178.82"}</span>
              </div>
            </div>
            <button onClick={handleRazorpay}
              className="w-full bg-blue-600 hover:bg-blue-500 py-7 rounded-3xl font-black text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-600/20"
            >
              PROCEED TO SECURE PAYMENT <ChevronRight size={18} />
            </button>
            <p className="text-center text-[9px] font-bold text-slate-500 uppercase mt-8 tracking-widest">Payments processed via Razorpay Secure Gateway</p>
          </div>
        </div>
      </div>
    </div>
  );
}