"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  CheckCircle2, Zap, ChevronRight, 
  ShieldCheck, Stethoscope, Crown, Loader2, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. DATA DEFINITIONS (LOCKED ARCHITECTURE)
interface Plan {
  id: string;
  name: string;
  price: number;
  color: string;
  bg: string;
  features: string[];
}

interface Doctor {
  id: string;
  name: string;
  type: string;
  role: string;
  fee: number;
}

const PLANS: Plan[] = [
  { id: "bronze", name: "Bronze", price: 299, color: "text-orange-500", bg: "bg-orange-50", features: ["Monthly Skin Scan", "AI Chat Access", "Digital Records"] },
  { id: "silver", name: "Silver", price: 599, color: "text-slate-400", bg: "bg-slate-50", features: ["Everything in Bronze", "1 Specialist Call", "Priority Support"] },
  { id: "premium", name: "Premium", price: 1299, color: "text-yellow-500", bg: "bg-yellow-50", features: ["Unlimited Consults", "Home Lab Samples", "Personal Care Manager"] },
];

const DOCTORS: Doctor[] = [
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
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(DOCTORS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Safely load Razorpay Checkout SDK
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Razorpay) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => setErrorMessage("Failed to load Razorpay SDK. Please check your network connection.");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const currentTotal = paymentCategory === "plan" ? selectedPlan.price : selectedDoctor.fee;

  const getAuthenticatedUser = useCallback(() => {
    if (typeof window === "undefined") return { name: "CareFlow Patient", email: "patient@careflow.ai" };
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          name: parsed.name || "CareFlow Patient",
          email: parsed.email || "patient@careflow.ai",
        };
      }
    } catch {
      // Fallback if parsing fails
    }
    return { name: "CareFlow Patient", email: "patient@careflow.ai" };
  }, []);

  const handlePayment = async () => {
    setErrorMessage("");

    if (!isScriptLoaded || !window.Razorpay) {
      setErrorMessage("Razorpay payment gateway is still initializing. Please wait a moment.");
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummyKey";

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      console.warn("[CareFlow Billing]: NEXT_PUBLIC_RAZORPAY_KEY_ID is unconfigured in .env.local.");
    }

    setIsLoading(true);

    try {
      const userInfo = getAuthenticatedUser();

      const options: RazorpayOptions & {
        modal: {
          ondismiss: () => void;
        };
      } = {
        key: razorpayKey,
        amount: currentTotal * 100, // Amount in paise
        currency: "INR",
        name: "CareFlow AI Health",
        description:
          paymentCategory === "plan"
            ? `${selectedPlan.name} Subscription Plan`
            : `Consultation with ${selectedDoctor.name}`,
        handler: async (response) => {
          setIsLoading(false);
          try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
            
            // Send payment details to backend for verification
            const verifyRes = await fetch(`${baseUrl}/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                amount: currentTotal,
                category: paymentCategory,
                entityId: paymentCategory === "plan" ? selectedPlan.id : selectedDoctor.id,
              }),
            });

            if (verifyRes.ok) {
              alert(`Payment Verified Successfully! Transaction ID: ${response.razorpay_payment_id}`);
            } else {
              alert(`Payment Processed! Transaction ID: ${response.razorpay_payment_id}`);
            }
          } catch {
            alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred while initiating payment.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 pt-10 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Checkout <span className="text-blue-600">Secure</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <ShieldCheck size={14} /> Encrypted SSL Gateway
            </span>
          </div>
        </div>

        {/* CATEGORY SWITCHER */}
        <div 
          role="tablist"
          aria-label="Payment Category"
          className="flex gap-2 p-2 bg-slate-100 rounded-[2rem] w-fit border border-slate-200"
        >
          <button 
            type="button"
            role="tab"
            aria-selected={paymentCategory === "plan"}
            onClick={() => {
              setPaymentCategory("plan");
              setErrorMessage("");
            }}
            className={cn(
              "px-8 sm:px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 focus-ring", 
              paymentCategory === "plan" ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Crown size={14} /> Subscription
          </button>
          <button 
            type="button"
            role="tab"
            aria-selected={paymentCategory === "consult"}
            onClick={() => {
              setPaymentCategory("consult");
              setErrorMessage("");
            }}
            className={cn(
              "px-8 sm:px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 focus-ring", 
              paymentCategory === "consult" ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Stethoscope size={14} /> Consultation
          </button>
        </div>
      </header>

      {/* ERROR ALERT BANNER */}
      {errorMessage && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-xs sm:text-sm font-semibold"
        >
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 space-y-12">
          
          {/* SELECTION AREA */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {paymentCategory === "plan" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedPlan(plan)}
                      className={cn(
                        "p-8 sm:p-10 rounded-[3rem] sm:rounded-[3.5rem] border-4 transition-all text-left bg-white relative flex flex-col justify-between h-full group focus-ring outline-none",
                        isSelected ? "border-blue-600 shadow-2xl scale-[1.02]" : "border-slate-100 opacity-70 hover:opacity-100 hover:border-slate-200"
                      )}
                    >
                      <div>
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm", plan.bg, plan.color)}>
                          <Zap size={28} fill="currentColor" />
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">{plan.name}</h2>
                        <p className="text-4xl font-black text-slate-900 mt-2 italic">₹{plan.price}</p>
                      </div>
                      <ul className="mt-8 space-y-3.5 pt-6 border-t border-slate-100 w-full">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                            <CheckCircle2 size={16} className="text-blue-500 shrink-0" /> 
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 italic">
                  Select Specialist Doctor
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {DOCTORS.map((doc) => {
                    const isSelected = selectedDoctor.id === doc.id;
                    const initials = doc.name
                      .split(" ")
                      .filter((n) => n.length > 0 && n !== "Dr.")
                      .map((n) => n[0])
                      .join("");

                    return (
                      <button
                        key={doc.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedDoctor(doc)}
                        className={cn(
                          "p-6 sm:p-8 rounded-[2.5rem] border-2 flex items-center justify-between text-left transition-all bg-white w-full focus-ring outline-none",
                          isSelected ? "border-blue-600 bg-blue-50/20 shadow-xl" : "border-slate-100 hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black italic text-lg sm:text-xl shrink-0 shadow-md">
                            {initials || "DR"}
                          </div>
                          <div>
                            <p className="text-base sm:text-lg font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                              {doc.name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                              {doc.role} • {doc.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right px-4 sm:px-8 border-l border-slate-100 shrink-0">
                          <p className="text-xl sm:text-2xl font-black text-blue-600 italic">₹{doc.fee}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Consult Fee</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </main>

        {/* SUMMARY SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-[3.5rem] sm:rounded-[4.5rem] sticky top-8 border border-slate-800 shadow-3xl overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />
            
            <h2 className="text-[11px] font-black uppercase opacity-40 mb-8 sm:mb-12 tracking-[0.4em] italic text-center">
              Order Summary
            </h2>
            
            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div className="flex justify-between items-end border-b border-slate-800 pb-6 sm:pb-8">
                <div>
                  <p className="text-[9px] font-black uppercase text-blue-500 tracking-widest mb-1">Product</p>
                  <p className="text-lg sm:text-xl font-black italic uppercase leading-none tracking-tighter">
                    {paymentCategory === "plan" ? `${selectedPlan.name} Access` : `Checkup: ${selectedDoctor.name.replace("Dr. ", "")}`}
                  </p>
                </div>
                <span className="font-bold text-slate-400 italic text-sm sm:text-base">₹{currentTotal}.00</span>
              </div>

              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-60">
                <span>Platform Processing Fee</span>
                <span className="text-emerald-400">Waived</span>
              </div>

              <div className="pt-6 sm:pt-8 flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-2 italic">
                  Grand Total
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter">
                    ₹{currentTotal}
                  </span>
                  <span className="text-blue-500 font-black italic text-xl">.00</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handlePayment}
                disabled={isLoading || !isScriptLoaded}
                className={cn(
                  "w-full bg-blue-600 hover:bg-white hover:text-blue-600 py-6 sm:py-8 rounded-[2.5rem] font-black text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-blue-600/30 mt-6 sm:mt-8 focus:outline-none focus:ring-4 focus:ring-blue-400",
                  (isLoading || !isScriptLoaded) && "opacity-70 cursor-not-allowed active:scale-100"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>INITIALIZING...</span>
                  </>
                ) : (
                  <>
                    <span>SECURE PAYMENT</span> 
                    <ChevronRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-[8px] font-bold text-slate-500 uppercase mt-8 sm:mt-12 tracking-[0.2em] leading-loose">
                Payments Processed by Razorpay Secure Gateway <br /> PCI-DSS Level 1 Certified & Encrypted
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}