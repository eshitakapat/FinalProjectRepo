import * as React from "react";
import { cn } from "@/lib/utils";

// 1. Extend the props to include variant and size
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

// 2. Use forwardRef so Framer Motion and other libs can access the DOM element
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    // 3. Define style mappings
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
      outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
      default: "bg-slate-900 text-white hover:bg-slate-800",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";