"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { DischargeTable } from "@/components/discharges/DischargeTable";
import { motion } from "framer-motion";

export default function DischargesPage() {
  const { discharges, wards, dischargePatient, initializeData, isHydrated } = useStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!isHydrated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Discharge Planner
        </h1>
        <p className="mt-2 text-slate-500">
          Coordinate patient discharges and bed turnover.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <DischargeTable
          discharges={discharges}
          wards={wards}
          onDischarge={dischargePatient}
        />
      </motion.div>
    </div>
  );
}
