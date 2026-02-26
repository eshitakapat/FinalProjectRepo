"use client";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Calendar, Shield, Users, Zap, 
  BarChart3, Clock, ArrowRight, X, CheckCircle2 
} from 'lucide-react';
import { featureDetails } from "@/constants/features";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Helper to get the key from the title for data lookup
  const getFeatureKey = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/24\/7/g, '24-7');
  };

  return (
    <section id="features" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Interactive Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-blue-200 text-blue-600 bg-blue-50/50 px-4 py-1">
              Features
            </Badge>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Everything in one <span className="text-blue-600">place</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Powerful tools designed to simplify complex healthcare workflows and improve patient outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(featureDetails).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setActiveFeature(getFeatureKey(feature.title))}
            >
              <Card className="h-full border-slate-100 bg-white/50 backdrop-blur-sm hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-sm">
                    <feature.icon size={28} />
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest bg-white">
                      {feature.tag}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-slate-500 leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Learn more <ArrowRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-blue-600 p-8 md:p-12 text-white relative">
                <button 
                  onClick={() => setActiveFeature(null)}
                  className="absolute top-6 right-6 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl">
                  {/* @ts-ignore */}
                  {(() => {
                    const Icon = featureDetails[activeFeature]?.icon;
                    return Icon ? <Icon size={32} /> : null;
                  })()}
                </div>
                {/* @ts-ignore */}
                <h2 className="text-3xl md:text-4xl font-black mb-2">{featureDetails[activeFeature]?.title}</h2>
                {/* @ts-ignore */}
                <p className="text-blue-100 text-lg font-medium">{featureDetails[activeFeature]?.tagline}</p>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 md:p-12">
                {/* @ts-ignore */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{featureDetails[activeFeature]?.content}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* @ts-ignore */}
                  {featureDetails[activeFeature]?.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 border border-slate-100">
                      <CheckCircle2 size={18} className="text-blue-600" /> {feat}
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => setActiveFeature(null)}
                  className="w-full mt-10 bg-slate-900 hover:bg-black text-white py-8 rounded-2xl text-lg font-bold shadow-lg shadow-slate-200"
                >
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}