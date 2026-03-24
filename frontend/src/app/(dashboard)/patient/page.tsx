"use client";
import React, { useState, useRef } from "react";
import { 
  Camera, Upload, Sparkles, AlertCircle, 
  X, ChevronRight, Activity, Info, 
  Thermometer, Zap, CheckCircle2, Pill
} from "lucide-react";

import { Card } from "@/components/ui/Card"; 
import { Button } from "@/components/ui/Button";

export default function PatientDashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- CAMERA LOGIC ---
  const startCamera = async () => {
    setShowCamera(true);
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied.");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      setImage(canvasRef.current.toDataURL("image/png"));
      stopCamera();
      runAIScan(canvasRef.current.toDataURL("image/png"));
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setShowCamera(false);
  };

const runAIScan = async (fileOrBase64: any) => {
  try {
    setIsScanning(true);
    setScanResult(null);

    const formData = new FormData();

    // ✅ helper function (YOU MISSED THIS)
    const base64ToFile = (base64: string) => {
      const arr = base64.split(",");
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], "capture.png", { type: mime });
    };

    // ✅ HANDLE BOTH CASES
    if (fileOrBase64 instanceof File) {
      formData.append("image", fileOrBase64);
    } else {
      const file = base64ToFile(fileOrBase64);
      formData.append("image", file);
    }

    const response = await fetch("http://localhost:5000/api/ai/analyze", {
      method: "POST",
      body: formData
    });

    // ✅ IMPORTANT (you were missing earlier)
    if (!response.ok) {
      const err = await response.text();
      console.error("❌ BACKEND ERROR:", err);
      setIsScanning(false);
      return;
    }

    const data = await response.json();

    console.log("✅ AI RESPONSE:", data);

    setScanResult(data);
    setIsScanning(false);

  } catch (err) {
    console.error("AI ERROR:", err);
    setIsScanning(false);
  }
};

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      
      {/* 1. HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Skin Analysis <span className="text-indigo-600">Studio</span>
          </h1>
          <p className="text-slate-400 font-bold mt-3 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
            <Activity size={14} className="text-indigo-500" /> Diagnostic Engine v2.0
          </p>
        </div>
        
        <div className="flex gap-3">
           <Button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-[11px] hover:bg-slate-50 transition-all flex items-center gap-2 uppercase tracking-widest">
             <Activity size={14}/> View Logs
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* 2. SCANNER ENGINE (LEFT) */}
        <div className="xl:col-span-7 space-y-8">
          <Card className="p-6 bg-white border-none shadow-2xl shadow-slate-200/40 rounded-[3.5rem] overflow-hidden">
            <div className="relative aspect-video rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center group">
              
              {showCamera ? (
                <div className="absolute inset-0 bg-black">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-50">
                    <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-[6px] border-slate-900 active:scale-90 transition-transform" />
                    <button onClick={stopCamera} className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 shadow-xl"><X size={28}/></button>
                  </div>
                </div>
              ) : image ? (
                <div className="relative w-full h-full">
                  <img src={image} className="w-full h-full object-cover" alt="Captured" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-md flex flex-col items-center justify-center transition-all">
                      <div className="w-full h-1.5 bg-white absolute top-0 animate-scanning shadow-[0_0_25px_#fff]" />
                      <Sparkles className="text-white animate-pulse mb-4" size={64} />
                      <p className="text-white font-black tracking-[0.3em] text-xs uppercase italic">Deep-Scanning Tissue...</p>
                    </div>
                  )}
                  {!isScanning && (
                    <button onClick={() => {setImage(null); setScanResult(null);}} className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur rounded-full text-slate-900 hover:bg-white shadow-2xl z-20 transition-all"><X size={20}/></button>
                  )}
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mx-auto mb-8 text-indigo-600 rotate-6 transition-all hover:rotate-0 hover:scale-105">
                    <Camera size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Ready to Scan</h3>
                  <p className="text-sm text-slate-400 mt-3 max-w-xs mx-auto font-bold uppercase tracking-wide">High-res capture required for AI accuracy</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <button onClick={startCamera} className="bg-slate-950 text-white py-8 rounded-[2rem] font-black flex items-center justify-center gap-4 hover:bg-black transition-all text-[11px] tracking-[0.2em] shadow-xl active:scale-95">
                <Camera size={20} /> START CAMERA
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="bg-indigo-600 text-white py-8 rounded-[2rem] font-black flex items-center justify-center gap-4 shadow-xl shadow-indigo-200/50 hover:bg-indigo-700 transition-all text-[11px] tracking-[0.2em] active:scale-95">
                <Upload size={20} /> UPLOAD PHOTO
              </button>
              <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                const file = e.target.files?.[0];
                if(file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => { setImage(ev.target?.result as string); runAIScan(file); };
                  reader.readAsDataURL(file);
                }
              }} accept="image/*" />
            </div>
          </Card>

          <Card className="p-10 bg-white border-none shadow-sm rounded-[3.5rem]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3 italic">
              <Thermometer size={18} className="text-indigo-500" /> Patient Observations
            </h3>
            <div className="flex flex-wrap gap-4">
              {["Itching", "Burning", "Scaling", "Pain", "Dryness", "Spreading"].map(s => (
                <button key={s} className="px-10 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[11px] font-black text-slate-500 hover:border-indigo-400 hover:bg-white transition-all uppercase tracking-tighter shadow-sm hover:shadow-lg hover:text-indigo-600 active:scale-90">
                  {s}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* 3. DIAGNOSTIC HUB (RIGHT) */}
        <div className="xl:col-span-5 space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 px-4 italic">
            <Activity size={18} className="text-indigo-500" /> Intelligence Feed
          </h3>

          {!scanResult && !isScanning ? (
            <div className="p-24 border-2 border-dashed border-slate-200 bg-white/50 rounded-[4.5rem] text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-inner mb-8 text-slate-200">
                <Info size={44} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Waiting for Visual Stream</p>
            </div>
          ) : isScanning ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-[3.5rem] shadow-sm animate-pulse border border-slate-50" />)}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
              <Card className="p-12 bg-slate-900 text-white border-none rounded-[4.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:rotate-12 transition-all duration-1000 scale-110">
                  <Sparkles size={260} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-indigo-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase italic tracking-widest">AI Result</span>
                    <span className="text-indigo-400 text-[11px] font-bold tracking-widest">{scanResult.confidence}% CONFIDENCE</span>
                  </div>
                  <h2 className="text-5xl font-black italic tracking-tighter leading-none mb-6 uppercase">{scanResult.disease}</h2>
                  <div className="flex items-center gap-3 text-rose-400 font-black text-xs uppercase tracking-[0.2em] italic">
                    <AlertCircle size={18} /> Severity: {scanResult.intensity}
                  </div>
                </div>
              </Card>

              <Card className="p-10 bg-white border-none shadow-sm rounded-[3.5rem]">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 italic">Biometric Biomarkers</h4>
                <div className="space-y-4">
                  {scanResult.biomarkers.map((tag: any) => (
                    <div key={tag} className="flex items-center gap-5 bg-slate-50 p-5 rounded-[1.8rem] border border-slate-100 hover:shadow-md transition-all">
                      <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                         <CheckCircle2 size={20} className="text-emerald-500" />
                      </div>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{tag}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-10 bg-indigo-600 text-white border-none rounded-[4rem] shadow-2xl shadow-indigo-200">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-6 flex items-center gap-3 italic">
                  <Pill size={18}/> Treatment Protocol
                </h4>
                <p className="text-sm font-bold leading-relaxed mb-10 italic opacity-95 tracking-wide">"{scanResult.plan}"</p>
                <button className="w-full bg-white text-indigo-700 font-black text-[11px] tracking-[0.2em] py-6 rounded-[2rem] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all group active:scale-95 shadow-lg">
                  REQUEST SPECIALIST REVIEW <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Card>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} hidden />
      <style jsx global>{`
        @keyframes scanning { 
          0% { top: 0%; opacity: 0.4; } 
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.4; } 
        }
        .animate-scanning { animation: scanning 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}