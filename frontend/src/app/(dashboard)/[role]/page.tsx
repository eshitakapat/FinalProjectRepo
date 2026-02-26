"use client";
import { redirect, useParams } from "next/navigation";

export default function RoleRedirectPage() {
  const params = useParams();
  const role = params.role;

  // This acts as a safety net. If someone goes to /[role] 
  // but that role folder doesn't exist, it sends them back to login.
  redirect("/login");
  return null;
}