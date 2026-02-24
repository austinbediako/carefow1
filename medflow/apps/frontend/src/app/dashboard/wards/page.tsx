"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { WardSummaryCard } from "@/components/dashboard/WardSummaryCard";
import { motion } from "framer-motion";

export default function WardsPage() {
  const { wards, initializeData, isHydrated } = useStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!isHydrated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Hospital Wards
        </h1>
        <p className="mt-2 text-slate-500">
          Overview of all department capacities and bed status.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {wards.map((ward) => (
          <WardSummaryCard key={ward.id} ward={ward} />
        ))}
      </motion.div>
    </div>
  );
}
