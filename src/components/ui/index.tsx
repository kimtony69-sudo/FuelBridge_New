"use client";
import { cn } from "@/lib/utils";
import { type ReactNode, forwardRef } from "react";

// ---- Badge ----
type BadgeVariant = "green"|"amber"|"red"|"blue"|"gray"|"dark";
export function Badge({ children, variant="gray", className }:
  { children: ReactNode; variant?: BadgeVariant; className?: string }) {
  const v = {
    green: "bg-green-100 text-green-800",
    amber: "bg-gold-100 text-gold-700",
    red:   "bg-red-100 text-red-600",
    blue:  "bg-blue-100 text-blue-600",
    gray:  "bg-ink-5 text-ink-60",
    dark:  "bg-ink-80 text-ink-10",
  }[variant];
  return (
    <span className={cn("inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide", v, className)}>
      {children}
    </span>
  );
}

// ---- Live dot ----
export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse2", className)} />;
}

// ---- Button ----
type ButtonVariant = "primary"|"secondary"|"ghost"|"danger"|"gold";
type ButtonSize = "sm"|"md"|"lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; size?: ButtonSize;
  asChild?: boolean; href?: string;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant="primary", size="md", className, children, ...props }, ref) => {
    const v = {
      primary:   "bg-green-800 text-green-100 hover:bg-green-700",
      secondary: "bg-transparent text-green-800 border-[1.5px] border-green-800 hover:bg-green-50",
      ghost:     "bg-transparent text-ink-60 border border-ink-10 hover:bg-ink-5 hover:text-ink",
      danger:    "bg-red-600 text-white hover:bg-red-800",
      gold:      "bg-gold-500 text-white hover:bg-gold-700",
    }[variant];
    const s = {
      sm: "px-3.5 py-1.5 text-[12px]",
      md: "px-5 py-2.5 text-[13px]",
      lg: "px-7 py-3.5 text-[15px] rounded-xl",
    }[size];
    return (
      <button ref={ref} className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-lg cursor-pointer transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        v, s, className
      )} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// ---- Alert ----
type AlertVariant = "green"|"amber"|"red"|"blue";
export function Alert({ variant="blue", icon, children, className }:
  { variant?: AlertVariant; icon?: ReactNode; children: ReactNode; className?: string }) {
  const v = {
    green: "bg-green-100 border-green-200 text-green-800",
    amber: "bg-gold-100 border-gold-400/40 text-gold-700",
    red:   "bg-red-100 border-red-600/20 text-red-600",
    blue:  "bg-blue-100 border-blue-600/20 text-blue-600",
  }[variant];
  return (
    <div className={cn("flex items-start gap-2.5 px-4 py-3 rounded-lg border text-[13px] leading-snug", v, className)}>
      {icon && <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

// ---- Card ----
export function Card({ children, className, dark }:
  { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn(
      "rounded-xl border p-5",
      dark ? "bg-ink-80 border-ink-60 text-white" : "bg-white border-ink-10",
      className
    )}>
      {children}
    </div>
  );
}

// ---- Section label ----
export function SectionLabel({ children, className }:
  { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[10px] font-semibold tracking-widest uppercase text-ink-40 mb-2", className)}>
      {children}
    </p>
  );
}

// ---- Divider ----
export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-ink-10", className)} />;
}

// ---- Upload Box ----
export function UploadBox({ label, required, optional }:
  { label: string; required?: boolean; optional?: string }) {
  return (
    <div className="border-[1.5px] border-dashed border-ink-10 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-green-600 hover:bg-green-50 bg-ink-5">
      <div className="text-2xl mb-1.5 text-ink-40">📄</div>
      <div className="text-[12px] font-medium text-ink-60">{label}</div>
      {required && <div className="text-[10px] text-red-600 mt-0.5">Required</div>}
      {optional && <div className="text-[10px] text-ink-40 mt-0.5">{optional}</div>}
    </div>
  );
}
