"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  User,
  FileText,
  Activity
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

/* ---------------- DATASET ---------------- */

const doctorsList = [
  { id:"as-1",name:"Dr. Ananya Sharma",type:"In-Person"},
  { id:"mv-2",name:"Dr. Marcus Vane",type:"Video"},
  { id:"sp-3",name:"Dr. Sarah Paul",type:"In-Person"},
  { id:"jw-4",name:"Dr. James Wilson",type:"Video"}
];

const timeSlots=["09:00 AM","10:30 AM","01:00 PM","02:30 PM","04:00 PM"];

/* ---------------- BUTTON ---------------- */

const Button = ({children,onClick,className="",variant="primary",disabled=false}:any)=>{

const variants:any={
primary:"bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
outline:"border border-slate-200 text-slate-600 hover:bg-slate-50",
dark:"bg-slate-900 text-white hover:bg-slate-800"
};

return(
<button
disabled={disabled}
onClick={onClick}
className={`px-4 py-2 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 font-bold ${variants[variant]} ${className}`}
>
{children}
</button>
);
};

/* ================= MAIN DASHBOARD ================= */

export default function UltimatePatientDashboard(){

const[activeView,setActiveView]=useState("schedule");
const[isBooking,setIsBooking]=useState(false);
const[step,setStep]=useState(1);

const[appointments,setAppointments]=useState<any[]>([]);

const[bookingData,setBookingData]=useState({
doctor:"",
time:"",
date:"Feb 12, 2026"
});

/* ---------------- FETCH APPOINTMENTS FROM MONGODB ---------------- */

useEffect(()=>{

const fetchAppointments = async()=>{

try{

const token = localStorage.getItem("token");

const res = await fetch(
"http://localhost:5000/api/appointments/my",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

/* Handle both backend response styles */

setAppointments(data.appointments || data);

}catch(err){
console.error("Fetch appointments error:",err);
}

};

fetchAppointments();

},[]);

/* ---------------- SLOT BLOCKING ---------------- */

const isSlotBooked=(time:string)=>{

return appointments.some(
(a)=>a.time===time &&
a.date===bookingData.date &&
a.doctor===bookingData.doctor
);

};

/* ---------------- CREATE APPOINTMENT ---------------- */

const createAppointment = async()=>{

if(!bookingData.time || !bookingData.doctor) return;

try{

const token = localStorage.getItem("token");

const res = await fetch(
"http://localhost:5000/api/appointments/create",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(bookingData)
}
);

const data = await res.json();

const newAppointment = data.appointment || data;

/* Update UI instantly */

setAppointments(prev=>[...prev,newAppointment]);

setStep(3);

}catch(err){
console.error("Create appointment error:",err);
}

};

/* ================= UI ================= */

return(

<div className="min-h-screen bg-[#FDFDFF] flex flex-col md:flex-row">

{/* SIDEBAR */}

<aside className="w-full md:w-72 bg-white border-r p-8 flex flex-col gap-10">

<h2 className="text-3xl font-black italic text-indigo-600 flex items-center gap-2">
<Sparkles className="fill-indigo-600"/> Glow
</h2>

<nav className="flex flex-col gap-3">

{[
{id:"schedule",label:"Schedule",icon:<CalendarDays size={20}/>},
{id:"doctors",label:"Specialists",icon:<User size={20}/>},
{id:"records",label:"Prescriptions",icon:<FileText size={20}/>},
{id:"tracker",label:"Symptom Log",icon:<Activity size={20}/>}
].map(item=>(

<button
key={item.id}
onClick={()=>setActiveView(item.id)}
className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest
${activeView===item.id?"bg-indigo-600 text-white":"text-slate-400 hover:bg-slate-50"}`}
>

{item.icon} {item.label}

</button>

))}

</nav>

</aside>

{/* MAIN */}

<main className="flex-1 p-12 overflow-y-auto">

{/* SCHEDULE */}

{activeView==="schedule" &&(

<div>

<div className="flex justify-between mb-12">

<h1 className="text-5xl font-black italic">
My Schedule
</h1>

<Button onClick={()=>{setStep(1);setIsBooking(true);}} className="h-14 px-10">
New Booking
</Button>

</div>

<div className="grid gap-6">

{appointments.length===0 &&(

<div className="text-center text-slate-400 py-20 font-bold">
NO APPOINTMENTS
</div>

)}

{appointments.map((appt:any)=>{

const doc=doctorsList.find(d=>d.name===appt.doctor);

return(

<div
key={appt._id}
className="bg-white p-8 rounded-[3rem] border flex justify-between items-center"
>

<div>

<h3 className="text-xl font-bold">{appt.doctor}</h3>

<div className="flex gap-6 text-xs font-black uppercase text-slate-400 mt-2">

<span className="flex gap-2 items-center text-slate-900">
<Calendar size={14}/> {appt.date}
</span>

<span className="flex gap-2 items-center text-slate-900">
<Clock size={14}/> {appt.time}
</span>

<span className="flex gap-2 items-center text-indigo-600">
{doc?.type==="In-Person"?<MapPin size={14}/>:<Video size={14}/>}
{doc?.type}
</span>

</div>

</div>

<Button variant="dark">
Join
</Button>

</div>

);

})}

</div>

</div>

)}

</main>

{/* BOOKING MODAL */}

<AnimatePresence>

{isBooking &&(

<div className="fixed inset-0 flex items-center justify-center z-50">

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="absolute inset-0 bg-black/60"
onClick={()=>setIsBooking(false)}
/>

<motion.div
initial={{scale:.9,opacity:0}}
animate={{scale:1,opacity:1}}
className="bg-white p-12 rounded-[3rem] w-full max-w-xl relative"
>

{/* STEP 1 */}

{step===1 &&(

<div>

<h2 className="text-3xl font-black mb-6">
Select Specialist
</h2>

{doctorsList.map(doc=>(

<button
key={doc.id}
onClick={()=>{
setBookingData({...bookingData,doctor:doc.name});
setStep(2);
}}
className="w-full p-4 border rounded-xl mb-3 flex justify-between"
>

{doc.name}

<ChevronRight/>

</button>

))}

</div>

)}

{/* STEP 2 */}

{step===2 &&(

<div>

<h2 className="text-3xl font-black mb-6">
Pick Time
</h2>

<div className="grid grid-cols-2 gap-4 mb-8">

{timeSlots.map(time=>{

const booked=isSlotBooked(time);

return(

<button
key={time}
disabled={booked}
onClick={()=>setBookingData({...bookingData,time})}
className={`py-4 rounded-xl border
${booked
?"bg-slate-200 text-slate-400"
:bookingData.time===time
?"bg-indigo-600 text-white"
:"hover:border-indigo-400"}`}
>

{time} {booked&&"(Booked)"}

</button>

);

})}

</div>

<Button
disabled={!bookingData.time}
onClick={createAppointment}
className="w-full h-14"
>
Confirm Booking
</Button>

</div>

)}

{/* STEP 3 */}

{step===3 &&(

<div className="text-center">

<CheckCircle2 size={60} className="text-emerald-600 mx-auto mb-6"/>

<h2 className="text-3xl font-black mb-4">
Confirmed
</h2>

<p className="text-slate-500 mb-8">
{bookingData.date} at {bookingData.time}
</p>

<Button
onClick={()=>setIsBooking(false)}
className="w-full"
>
Back
</Button>

</div>

)}

</motion.div>

</div>

)}

</AnimatePresence>

</div>

);

}