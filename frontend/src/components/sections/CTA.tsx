"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
      >
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-50 blur-3xl" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
          Ready to transform your <br /> medical practice?
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
          Join over 10,000+ healthcare providers who have simplified their 
          workflow with CareFlow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-10 text-lg">
            Get Started Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-blue-700 h-14 px-10 text-lg">
            Contact Sales
          </Button>
        </div>
      </motion.div>
    </section>
  );
}