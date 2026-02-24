import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "green" | "amber" | "red" | "gray";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "gray",
  children,
  ...props
}: BadgeProps) {
  const styles = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
          styles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
