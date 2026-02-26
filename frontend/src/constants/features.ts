import { 
  Calendar, 
  User, 
  CreditCard, 
  BarChart3, 
  ShieldCheck, 
  Globe,
  LucideIcon 
} from "lucide-react";

// 1. Define the structure of a single feature
export interface FeatureDetail {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  content: string;
  features: string[];
}

// 2. Export the full object with a Record type to allow string indexing
export const featureDetails: Record<string, FeatureDetail> = {
  "smart-scheduling": {
    title: "Smart Scheduling",
    tagline: "Optimize your clinic's workflow with AI-driven booking.",
    description: "Automated booking system that syncs with your staff's real-time availability.",
    icon: Calendar,
    tag: "Popular",
    content: "Our automated system goes beyond simple calendar sync. It intelligently allocates time slots based on procedure complexity and sends automated SMS/Email reminders to reduce no-shows by up to 40%.",
    features: ["Automated Reminders", "Multi-staff Sync", "Procedure-based Blocking"]
  },
  "patient-portal": {
    title: "Patient Portal",
    tagline: "Empowering patients with 24/7 access to their health journey.",
    description: "Secure access for patients to view records, bills, and message doctors.",
    icon: User,
    tag: "Secure",
    content: "A secure gateway where patients can view lab results, download digital prescriptions, and communicate directly with their dermatologists.",
    features: ["Secure Messaging", "Lab Result Access", "Medical History Archive"]
  },
  "instant-billing": {
    title: "Instant Billing",
    tagline: "Transparent financial management for patients and providers.",
    description: "One-click invoicing and insurance claims processing without the wait.",
    icon: CreditCard,
    tag: "Fast",
    content: "Simplify the payment process with one-click invoicing. Supports automated insurance claim generation and integrated payment gateways like Stripe.",
    features: ["Insurance Integration", "Automated Invoicing", "Instant Settlement"]
  },
  "analytics": {
    title: "Analytics",
    tagline: "Turn clinical data into actionable hospital growth.",
    description: "Real-time data on clinic performance and patient satisfaction metrics.",
    icon: BarChart3,
    tag: "Insights",
    content: "Monitor patient satisfaction scores, revenue trends, and doctor efficiency in real-time with visual heatmaps and growth charts.",
    features: ["Revenue Tracking", "Efficiency Heatmaps", "Patient Feedback"]
  },
  "hipaa-compliant": {
    title: "HIPAA Compliant",
    tagline: "Enterprise-grade security you can trust.",
    description: "Enterprise-grade security that keeps your medical data safe and private.",
    icon: ShieldCheck,
    tag: "Verified",
    content: "We use AES-256 bit encryption for data at rest and TLS 1.3 for data in transit. Regular third-party audits ensure 100% compliance.",
    features: ["End-to-End Encryption", "Security Audits", "Access Control"]
  },
  "24-7-access": {
    title: "24/7 Access",
    tagline: "Your clinic, available anywhere, anytime.",
    description: "Cloud-based platform available on any device, anywhere in the world.",
    icon: Globe,
    tag: "Anywhere",
    content: "Built on a resilient cloud infrastructure with 99.9% uptime. Access your data seamlessly from mobile or desktop devices worldwide.",
    features: ["Cloud Reliability", "Mobile Ready", "Global Access"]
  }
};