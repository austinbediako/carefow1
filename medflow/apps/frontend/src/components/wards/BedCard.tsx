"use client";

import React from "react";
import { Bed } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/lib/store";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface BedCardProps {
  bed: Bed;
  wardId: string;
}

export function BedCard({ bed, wardId }: BedCardProps) {
  const { markBedCleaning, markBedAvailable } = useStore();

  const statusColors = {
    AVAILABLE: "bg-green-50 border-green-100",
    OCCUPIED: "bg-blue-50 border-blue-100",
    RESERVED: "bg-purple-50 border-purple-100",
    CLEANING: "bg-amber-50 border-amber-100",
    OUT_OF_SERVICE: "bg-slate-50 border-slate-100",
  };

  const statusIcons = {
    AVAILABLE: "https://img.icons8.com/ios-filled/50/475569/checkmark--v1.png",
    OCCUPIED: "https://img.icons8.com/ios-filled/50/475569/user.png",
    RESERVED: "https://img.icons8.com/ios-filled/50/475569/error--v1.png",
    CLEANING: "https://img.icons8.com/ios-filled/50/475569/cleaning.png",
    OUT_OF_SERVICE: "https://img.icons8.com/ios-filled/50/475569/do-not-disturb.png",
  };

  const iconUrl = statusIcons[bed.status] || statusIcons.OUT_OF_SERVICE;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={clsx(
          "relative h-full transition-all duration-300",
          statusColors[bed.status],
          "hover:shadow-md"
        )}
        padding="sm"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className={clsx("p-1.5 rounded-lg bg-white/50")}>
              <img src={iconUrl} alt={bed.status} className="h-4 w-4 object-contain" />
            </div>
            <span className="font-semibold text-slate-900">{bed.name}</span>
          </div>
          <Badge
            variant={
              bed.status === "AVAILABLE"
                ? "green"
                : bed.status === "OCCUPIED"
                  ? "blue"
                  : bed.status === "CLEANING"
                    ? "amber"
                    : "gray"
            }
          >
            {bed.status}
          </Badge>
        </div>

        <div className="min-h-[60px]">
          {bed.status === "OCCUPIED" && (
            <div className="text-sm">
              <p className="font-medium text-slate-900">{bed.patientName}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{bed.patientId}</p>
            </div>
          )}
          {bed.status === "RESERVED" && (
            <div className="text-sm text-purple-700">
              <p className="font-medium">Reserved for Admission</p>
            </div>
          )}
          {bed.status === "CLEANING" && (
            <div className="text-sm text-amber-700">
              <p className="font-medium">Housekeeping in progress</p>
            </div>
          )}
          {bed.status === "AVAILABLE" && (
            <div className="text-sm text-green-700">
              <p className="font-medium">Ready for admission</p>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200/50 flex justify-end">
          {bed.status === "CLEANING" && (
            <Button
              size="sm"
              variant="outline"
              className="bg-white hover:bg-green-50 text-green-700 border-green-200"
              onClick={() => markBedAvailable(wardId, bed.id)}
            >
              Mark Clean
            </Button>
          )}
          {bed.status === "OCCUPIED" && (
            <Button
              size="sm"
              variant="outline"
              className="bg-white hover:bg-amber-50 text-amber-700 border-amber-200"
              onClick={() => markBedCleaning(wardId, bed.id)}
            >
              Discharge
            </Button>
          )}
          {bed.status === "AVAILABLE" && (
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-amber-600"
              onClick={() => markBedCleaning(wardId, bed.id)}
            >
              Mark Dirty
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
