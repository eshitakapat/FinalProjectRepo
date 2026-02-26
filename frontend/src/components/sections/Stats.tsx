"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Patients", value: "10,000+" },
  { label: "Partner Clinics", value: "500+" },
  { label: "Data Accuracy", value: "99.9%" },
  { label: "Support", value: "24/7" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}