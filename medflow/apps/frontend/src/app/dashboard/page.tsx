"use client";

import React, { useEffect, useMemo } from "react";
import { useStore } from "@/lib/store";
import { KPICard } from "@/components/dashboard/KPICard";
import { WardSummaryCard } from "@/components/dashboard/WardSummaryCard";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { wards, requests, isHydrated, initializeData } = useStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const stats = useMemo(() => {
    if (!isHydrated) return null;

    const totalBeds = wards.reduce((acc, w) => acc + w.beds.length, 0);
    const occupied = wards.reduce(
      (acc, w) => acc + w.beds.filter((b) => b.status === "OCCUPIED").length,
      0
    );
    const available = wards.reduce(
      (acc, w) => acc + w.beds.filter((b) => b.status === "AVAILABLE").length,
      0
    );
    const icuAvailable = wards
      .filter((w) => w.type === "ICU")
      .reduce(
        (acc, w) => acc + w.beds.filter((b) => b.status === "AVAILABLE").length,
        0
      );

    const occupancyRate = totalBeds > 0 ? Math.round((occupied / totalBeds) * 100) : 0;

    return {
      occupancyRate,
      available,
      icuAvailable,
      edPending: requests.filter((r) => r.status === "PENDING").length,
    };
  }, [wards, requests, isHydrated]);

  if (!isHydrated || !stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Command Center
        </h1>
        <p className="mt-2 text-slate-500">
          Real-time overview of hospital capacity and patient flow.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <KPICard
            title="Occupancy Rate"
            value={stats.occupancyRate}
            suffix="%"
            icon="https://img.icons8.com/color/48/activity.png"
            color={stats.occupancyRate > 90 ? "red" : "blue"}
            trend={{ value: 2, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={item}>
          <KPICard
            title="Available Beds"
            value={stats.available}
            icon="https://img.icons8.com/color/48/hospital-bed.png"
            color="green"
            trend={{ value: 5, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={item}>
          <KPICard
            title="ED Awaiting Bed"
            value={stats.edPending}
            icon="https://img.icons8.com/color/48/user-group-man-man.png"
            color={stats.edPending > 5 ? "red" : "amber"}
            trend={{ value: 12, isPositive: false }}
          />
        </motion.div>
        <motion.div variants={item}>
          <KPICard
            title="ICU Availability"
            value={stats.icuAvailable}
            icon="https://img.icons8.com/color/48/stethoscope.png"
            color={stats.icuAvailable < 2 ? "red" : "blue"}
          />
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Ward Status</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {wards.map((ward) => (
            <motion.div key={ward.id} variants={item}>
              <WardSummaryCard ward={ward} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
