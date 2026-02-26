"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to set up CareFlow?",
    answer: "Most clinics are up and running within 24 hours. Our automated data migration tools help you import your existing patient records seamlessly."
  },
  {
    question: "Where can i book an appointment?",
    answer: "You can book an appointment at your home page or ask AI chatbot for assistance"
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. There are no long-term contracts. If you decide to leave, you can export all your data with a single click."
  },
  {
    question: "Does CareFlow integrate with insurance providers?",
    answer: "Yes! CareFlow integrates with major insurance clearinghouses to provide real-time claims tracking and instant eligibility checks."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
            <HelpCircle size={16} />
            <span>Support</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about the platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-2xl transition-all duration-300",
                activeIndex === index ? "border-blue-200 bg-blue-50/30" : "border-slate-100 bg-white"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={cn(
                  "font-bold text-lg transition-colors",
                  activeIndex === index ? "text-blue-600" : "text-slate-900"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "p-1 rounded-full transition-transform duration-300",
                  activeIndex === index ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-400"
                )}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* Bottom Call to Action */}
        <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-slate-400 mb-6">We're here to help you 24/7.</p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}