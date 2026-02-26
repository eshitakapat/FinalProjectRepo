"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import LogoSlider from "@/components/sections/LogoSlider";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen antialiased bg-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <Navbar />

      {/* Hero Section - Centered, No Mockup */}
      <div className="relative overflow-hidden">
        {/* Graphic Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-40" />
        
        <Hero />
        <LogoSlider />
      </div>

      {/* Features Section */}
      <section className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.02)] rounded-t-[3rem]">
        <Stats />
        <Features /> 
      </section>

      {/* Sliding Testimonials Section */}
      <section className="bg-slate-50/50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 text-center">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 italic">Reviews</h2>
           <p className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">What Our Patients Say</p>
        </div>
        
        {/* This container handles the smooth horizontal slide */}
        <div className="flex marquee-container">
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section - Kept as requested */}
      <div className="bg-white py-20 border-t border-slate-100">
        <FAQ />
      </div>

      <Footer />

      {/* Global CSS for the Smooth Slider */}
      <style jsx global>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        /* Apply this to your Testimonials inner wrapper */
        .marquee-content {
          display: flex;
          gap: 2rem;
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}