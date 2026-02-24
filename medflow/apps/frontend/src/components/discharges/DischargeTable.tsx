"use client";

import React from "react";
import { Discharge, Ward } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Calendar, AlertCircle } from "lucide-react";

interface DischargeTableProps {
  discharges: Discharge[];
  wards: Ward[];
  onDischarge: (id: string) => void;
}

export function DischargeTable({ discharges, wards, onDischarge }: DischargeTableProps) {
  const getWardName = (id: string) => wards.find((w) => w.id === id)?.name || id;

  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-slate-500">
        <thead className="bg-slate-50 text-xs uppercase text-slate-700 font-semibold tracking-wider">
          <tr>
            <th className="px-6 py-4">Patient</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Planned Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <AnimatePresence>
            {discharges.map((discharge) => (
              <motion.tr
                key={discharge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{discharge.patientName}</div>
                  <div className="text-xs text-slate-400">{discharge.mrn}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-700">{getWardName(discharge.wardId)}</span>
                    <span className="text-xs text-slate-400">Bed {discharge.bedId.split('-')[1]}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(discharge.plannedDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="amber" className="bg-amber-100 text-amber-700">
                    {discharge.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => onDischarge(discharge.id)}
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Process Discharge
                  </Button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>

          {discharges.length === 0 && (
            <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8 text-slate-300" />
                        <p>No planned discharges.</p>
                    </div>
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
