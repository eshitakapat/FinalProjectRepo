import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The 'cn' utility allows you to merge Tailwind classes efficiently.
 * It handles conditional classes (clsx) and ensures the last class 
 * defined wins in case of conflicts (tailwind-merge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}