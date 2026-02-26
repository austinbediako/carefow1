"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion, useSpring, useTransform } from "framer-motion";
import { clsx } from "clsx";

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: string;
  trend?: { value: number; isPositive: boolean };
  color?: "blue" | "green" | "amber" | "red";
}

export function KPICard({ title, value, suffix = "", icon, trend, color = "blue" }: KPICardProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 15 });
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <motion.span className="text-3xl font-bold text-slate-900">
              {displayValue}
            </motion.span>
            <span className="text-lg font-medium text-slate-400">{suffix}</span>
          </div>
        </div>
        <div className={clsx("rounded-xl p-2.5", colors[color])}>
          <img src={icon} alt={title} className="h-5 w-5 object-contain" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-xs font-medium">
          <span
            className={clsx(
              trend.isPositive ? "text-green-600" : "text-red-600",
              "flex items-center"
            )}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
          <span className="ml-2 text-slate-400">vs last hour</span>
        </div>
      )}
    </Card>
  );
}
