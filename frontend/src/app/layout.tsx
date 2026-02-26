import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareFlow | Skin Care Hospital",
  description: "Advanced Dermatology & Hospital Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        {/* This is where your Landing Page, Login, and Dashboards will render */}
        {children}
      </body>
    </html>
  );
}