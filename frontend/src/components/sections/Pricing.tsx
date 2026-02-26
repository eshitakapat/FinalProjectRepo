"use client";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Perfect for small private clinics.",
    features: ["Up to 2 Doctors", "Basic Analytics", "Email Support", "Patient Records", "Digital Intake"],
    highlight: false,
  },
  {
    name: "Professional",
    monthlyPrice: 129,
    yearlyPrice: 99,
    description: "Advanced tools for growing practices.",
    features: ["Up to 10 Doctors", "Advanced Analytics", "24/7 Priority Support", "Billing Integration", "Custom Branding", "SMS Reminders"],
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "Full-scale solution for hospitals.",
    features: ["Unlimited Doctors", "Dedicated Account Manager", "API Access", "SSO & Security", "Custom Contracts", "On-site Training"],
    highlight: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 px-6 bg-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Pricing Plans</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Scale your care, <span className="text-blue-600">not your costs</span>
          </h2>
          
          {/* Interactive Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-slate-900" : "text-slate-400")}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-slate-900" : "text-slate-400")}>
              Yearly <span className="text-blue-600 font-bold ml-1 text-xs">Save 20%</span>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <Card className={cn(
              "relative transition-all duration-500 overflow-hidden",
              plan.highlight 
                ? "border-blue-500 shadow-2xl shadow-blue-200 md:scale-110 z-10 bg-white" 
                : "border-slate-200 bg-white/80 backdrop-blur-sm"
            )}>
              {plan.highlight && (
                <div className="bg-blue-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles size={14} /> Recommended <Sparkles size={14} />
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6 h-10">{plan.description}</p>
                
                <div className="mb-8 h-12 flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-4xl font-bold text-slate-900"
                    >
                      {typeof plan.monthlyPrice === 'number' 
                        ? (isYearly ? `$${plan.yearlyPrice}` : `$${plan.monthlyPrice}`)
                        : plan.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  {typeof plan.monthlyPrice === 'number' && (
                    <span className="text-slate-400 text-sm">/month</span>
                  )}
                </div>

                <Button 
                  className={cn(
                    "w-full mb-8 rounded-xl h-12 font-bold transition-all",
                    plan.highlight 
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" 
                      : "bg-slate-900 hover:bg-slate-800"
                  )}
                >
                  Get Started
                </Button>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Includes:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="bg-blue-50 p-1 rounded-full">
                          <Check size={14} className="text-blue-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}