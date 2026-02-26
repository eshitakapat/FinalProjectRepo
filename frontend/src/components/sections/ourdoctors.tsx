"use client";
import { Star, ShieldCheck, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const doctors = [
  {
    name: "Dr. Ananya Sharma",
    specialty: "Medical Dermatology",
    focus: "Acne & Eczema",
    experience: "12+ Years",
    rating: 4.9,
    image: "👩‍⚕️"
  },
  {
    name: "Dr. Vikram Seth",
    specialty: "Cosmetic Surgeon",
    focus: "Laser & Anti-aging",
    experience: "15+ Years",
    rating: 5.0,
    image: "👨‍⚕️"
  }
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">
          Expert Care for your <span className="text-blue-600">Unique Skin</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doc, i) => (
            <Card key={i} className="p-8 group hover:shadow-2xl transition-all duration-500 border-none bg-white">
              <div className="flex gap-6 items-start">
                <div className="text-6xl bg-blue-50 p-4 rounded-3xl group-hover:scale-110 transition-transform">
                  {doc.image}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold">{doc.name}</h3>
                    <div className="flex items-center text-amber-500 font-bold text-sm">
                      <Star size={16} fill="currentColor" /> {doc.rating}
                    </div>
                  </div>
                  <p className="text-blue-600 font-semibold mb-1">{doc.specialty}</p>
                  <p className="text-slate-500 text-sm mb-4">Focus: {doc.focus}</p>
                  
                  <div className="flex gap-4 mb-6">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <Award size={14} /> {doc.experience}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <ShieldCheck size={14} /> Verified
                    </span>
                  </div>
                  
                  <Button className="w-full rounded-xl bg-slate-900 group-hover:bg-blue-600 transition-colors">
                    View Profile & Reviews
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}