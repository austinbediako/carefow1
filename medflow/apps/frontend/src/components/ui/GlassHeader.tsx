import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassHeader({ className, children, ...props }: GlassHeaderProps) {
  return (
    <header
      className={twMerge(
        clsx(
          "sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200/50 bg-white/80 px-6 backdrop-blur-xl transition-all",
          className
        )
      )}
      {...props}
    >
      {children}
    </header>
  );
}
