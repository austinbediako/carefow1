"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Ward } from "@/types";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface WardSummaryCardProps {
  ward: Ward;
}

export function WardSummaryCard({ ward }: WardSummaryCardProps) {
  const router = useRouter();

  const counts = {
    AVAILABLE: ward.beds.filter((b) => b.status === "AVAILABLE").length,
    OCCUPIED: ward.beds.filter((b) => b.status === "OCCUPIED").length,
    CLEANING: ward.beds.filter((b) => b.status === "CLEANING").length,
    RESERVED: ward.beds.filter((b) => b.status === "RESERVED").length,
  };

  const capacity = ward.beds.length;
  const occupancyRate = Math.round((counts.OCCUPIED / capacity) * 100);

  const occupancyColor =
    occupancyRate > 90
      ? "bg-red-500"
      : occupancyRate > 75
      ? "bg-amber-500"
      : "bg-green-500";

  return (
    <Card
      hover
      className="cursor-pointer group"
      onClick={() => router.push(`/dashboard/wards/${ward.id}`)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-slate-900">{ward.name}</h3>
          <p className="text-sm text-slate-500 capitalize">{ward.type.toLowerCase()} • L{ward.level}</p>
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-50 border border-slate-100 font-bold text-sm text-slate-700">
          {occupancyRate}%
        </div>
      </div>

      <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-4">
        <motion.div
          className={clsx("absolute left-0 top-0 h-full", occupancyColor)}
          initial={{ width: 0 }}
          animate={{ width: `${occupancyRate}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-green-50 text-green-700">
          <div className="font-bold text-base">{counts.AVAILABLE}</div>
          <div className="text-[10px] font-medium opacity-80">Free</div>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
          <div className="font-bold text-base">{counts.OCCUPIED}</div>
          <div className="text-[10px] font-medium opacity-80">Occ</div>
        </div>
        <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
          <div className="font-bold text-base">{counts.CLEANING}</div>
          <div className="text-[10px] font-medium opacity-80">Clean</div>
        </div>
        <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
          <div className="font-bold text-base">{counts.RESERVED}</div>
          <div className="text-[10px] font-medium opacity-80">Rsrv</div>
        </div>
      </div>
    </Card>
  );
}
