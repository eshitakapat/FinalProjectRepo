import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
// TypeScript does not resolve side-effect CSS imports in some editor configurations.
// Next.js processes this stylesheet at build time.
// @ts-ignore -- CSS is handled by Next.js, not TypeScript.
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "CareFlow | Advanced Dermatology & Health Management",
    template: "%s | CareFlow AI",
  },
  description:
    "Next-generation medical consultation and dermatology management platform powering real-time patient care, doctor queues, and clinical workflows.",
  keywords: [
    "Dermatology",
    "Healthcare SaaS",
    "Medical Consultation",
    "Patient Portal",
    "Doctor Dashboard",
    "CareFlow AI",
  ],
  authors: [{ name: "CareFlow Engineering Team" }],
  openGraph: {
    title: "CareFlow | Advanced Medical Consultation Platform",
    description:
      "Next-generation healthcare workflow system for patients, doctors, and hospital administrators.",
    url: "https://careflow.ai",
    siteName: "CareFlow AI",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} antialiased bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white min-h-screen flex flex-col`}
      >
        {/* Global Application Shell / Route Group Provider Container */}
        {children}
      </body>
    </html>
  );
}