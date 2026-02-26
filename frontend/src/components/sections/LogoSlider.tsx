"use client";

const logos = [
  { name: "Acme Corp", icon: "🏥" },
  { name: "Global Health", icon: "🌐" },
  { name: "MedTech", icon: "💊" },
  { name: "BioLife", icon: "🧬" },
  { name: "Pulse Systems", icon: "❤️" },
  { name: "Wellness Co", icon: "🍃" },
];

export default function LogoSlider() {
  return (
    <div className="w-full py-12 bg-white border-y border-slate-100 overflow-hidden">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
        Trusted by leading healthcare providers
      </p>
      
      <div className="relative flex overflow-x-hidden">
        {/* First set of logos */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 mx-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <span className="text-3xl">{logo.icon}</span>
              <span className="text-xl font-bold text-slate-700">{logo.name}</span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless looping */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 mx-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <span className="text-3xl">{logo.icon}</span>
              <span className="text-xl font-bold text-slate-700">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}