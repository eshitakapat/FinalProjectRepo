"use client";
import { useState, useRef } from "react";

interface ComparisonProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function ComparisonSlider({ beforeImg, afterImg, beforeLabel = "Before", afterLabel = "After" }: ComparisonProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-col-resize select-none border-4 border-white shadow-xl"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 bg-slate-200">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${afterImg})` }} />
        <span className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">{afterLabel}</span>
      </div>

      {/* Before Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 border-r-2 border-white"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${beforeImg})` }} />
        <span className="absolute bottom-4 left-4 bg-blue-600/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">{beforeLabel}</span>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-slate-300 rounded-full" />
            <div className="w-0.5 h-3 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}