"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { BedCard } from "@/components/wards/BedCard";
import { Button } from "@/components/ui/Button";
import { BedStatus } from "@/types";
import { ArrowLeft, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function WardDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { wards, initializeData, isHydrated } = useStore();
  const [filter, setFilter] = useState<BedStatus | "ALL">("ALL");

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!isHydrated) return null;

  const ward = wards.find((w) => w.id === id);

  if (!ward) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold text-slate-900">Ward Not Found</h2>
        <Button onClick={() => router.push("/dashboard")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const filteredBeds =
    filter === "ALL" ? ward.beds : ward.beds.filter((b) => b.status === filter);

  const stats = {
    total: ward.beds.length,
    available: ward.beds.filter((b) => b.status === "AVAILABLE").length,
    occupied: ward.beds.filter((b) => b.status === "OCCUPIED").length,
    cleaning: ward.beds.filter((b) => b.status === "CLEANING").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {ward.name}
          </h1>
          <p className="text-sm text-slate-500">
            {ward.type} Level {ward.level} • {stats.available} beds available
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          size="sm"
          variant={filter === "ALL" ? "primary" : "secondary"}
          onClick={() => setFilter("ALL")}
        >
          All Beds ({stats.total})
        </Button>
        <Button
          size="sm"
          variant={filter === "AVAILABLE" ? "primary" : "secondary"}
          className={filter === "AVAILABLE" ? "bg-green-600 hover:bg-green-700" : ""}
          onClick={() => setFilter("AVAILABLE")}
        >
          Available ({stats.available})
        </Button>
        <Button
          size="sm"
          variant={filter === "OCCUPIED" ? "primary" : "secondary"}
          className={filter === "OCCUPIED" ? "bg-blue-600 hover:bg-blue-700" : ""}
          onClick={() => setFilter("OCCUPIED")}
        >
          Occupied ({stats.occupied})
        </Button>
        <Button
          size="sm"
          variant={filter === "CLEANING" ? "primary" : "secondary"}
          className={filter === "CLEANING" ? "bg-amber-600 hover:bg-amber-700" : ""}
          onClick={() => setFilter("CLEANING")}
        >
          Cleaning ({stats.cleaning})
        </Button>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
          {filteredBeds.map((bed) => (
            <BedCard key={bed.id} bed={bed} wardId={ward.id} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
