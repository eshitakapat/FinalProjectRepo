"use client";
import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Dr. Sarah Chen", role: "Chief of Medicine", text: "Careflow has cut our administrative work in half. The interface is remarkably intuitive." },
  { name: "James Wilson", role: "Clinic Admin", text: "The transition was seamless. Our staff actually enjoys using the software every day." },
  { name: "Dr. Aris Thorne", role: "Dermatologist", text: "The AI accuracy is staggering. It has become an essential triage tool in my daily clinic flow." },
  { name: "Sarah Jenkins", role: "Patient", text: "Finally, a healthcare app that doesn't look like it was made in 1995. Beautiful and easy to use." },
  { name: "Elena Rossi", role: "Skin Specialist", text: "CareFlow's diagnostic engine is the most precise I've tested. Truly professional grade." },
  { name: "Marcus Vane", role: "Patient", text: "The 'cute' interface makes a scary diagnosis feel much more manageable. Highly recommend." },
  { name: "Dr. Linda Park", role: "Practitioner", text: "Seamless transition from scan to specialist review. The UI is incredibly intuitive." },
  { name: "Tom Hollander", role: "Patient", text: "I upgraded to Pro for the unlimited scans. It's worth every penny for the peace of mind." },
  { name: "Kevin Hartz", role: "SaaS Lead", text: "CareFlow is setting the gold standard for patient-facing medical dashboards." },
  { name: "Nina Ricci", role: "Patient", text: "Fast, accurate, and professional. The best skin health app on the market today." },
];

export default function Testimonials() {
  return (
    <section className="py-10 bg-transparent overflow-hidden">
      <div className="relative flex overflow-hidden">
        
        {/* FIRST SET */}
        <div className="flex animate-marquee-custom whitespace-nowrap gap-8 py-4">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>

        {/* SECOND SET (LOOP) */}
        <div className="flex animate-marquee-custom whitespace-nowrap gap-8 py-4 ml-8" aria-hidden="true">
          {reviews.map((review, idx) => (
            <ReviewCard key={`dup-${idx}`} {...review} />
          ))}
        </div>

      </div>

      {/* INJECTING THE SCROLLING LOGIC DIRECTLY */}
      <style jsx>{`
        .animate-marquee-custom {
          display: flex;
          animation: marquee-scroll 40s linear infinite;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 2rem)); }
        }

        /* Stops animation on hover so people can read */
        .relative:hover .animate-marquee-custom {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ name, role, text }: { name: string, role: string, text: string }) {
  return (
    <div className="w-[400px] flex-shrink-0 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 hover:shadow-xl hover:border-blue-100 transition-all duration-500 group relative">
      <Quote className="absolute right-10 top-10 text-slate-50 group-hover:text-blue-50 transition-colors" size={60} />
      <div className="flex gap-1 mb-6 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#2563eb" className="text-blue-600" />
        ))}
      </div>
      <p className="text-[13px] font-bold text-slate-600 leading-relaxed mb-10 italic whitespace-normal relative z-10">
        "{text}"
      </p>
      <div className="pt-6 border-t border-slate-50 flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-blue-600 text-sm tracking-tighter uppercase italic">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic leading-none">{name}</h4>
          <p className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-2">{role}</p>
        </div>
      </div>
    </div>
  );
}