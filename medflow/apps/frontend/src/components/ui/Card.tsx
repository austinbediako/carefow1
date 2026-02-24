import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export function Card({
  className,
  children,
  padding = "md",
  hover = false,
  ...props
}: CardProps) {
  const paddingClass = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "bg-white rounded-[20px] shadow-sm border border-slate-100/50",
          "transition-all duration-300 ease-out",
          hover && "hover:shadow-md hover:-translate-y-1 hover:border-slate-200/80",
          paddingClass[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(clsx("mb-4 flex items-center justify-between", className))}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={twMerge(
        clsx("text-lg font-semibold text-slate-900 tracking-tight", className)
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={twMerge(clsx("text-sm text-slate-500", className))} {...props}>
      {children}
    </p>
  );
}
