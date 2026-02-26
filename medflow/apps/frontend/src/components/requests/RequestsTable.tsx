"use client";

import React, { useState } from "react";
import { AdmissionRequest } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AllocationModal } from "./AllocationModal";
import { motion, AnimatePresence } from "framer-motion";

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}

interface RequestsTableProps {
  requests: AdmissionRequest[];
}

export function RequestsTable({ requests }: RequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<AdmissionRequest | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-500">
          <thead className="bg-slate-50 text-xs uppercase text-slate-700 font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Diagnosis</th>
              <th className="px-6 py-4">Required</th>
              <th className="px-6 py-4">Wait Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {requests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        request.priority === "P1"
                          ? "red"
                          : request.priority === "P2"
                            ? "amber"
                            : "blue"
                      }
                      className={
                        request.priority === "P1"
                          ? "bg-red-100 text-red-700 ring-1 ring-red-600/10"
                          : request.priority === "P2"
                            ? "bg-amber-100 text-amber-700 ring-1 ring-amber-600/10"
                            : "bg-blue-100 text-blue-700 ring-1 ring-blue-600/10"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{request.patientName}</div>
                    <div className="text-xs text-slate-400">{request.mrn} • {request.gender}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[200px] truncate" title={request.diagnosis}>
                      {request.diagnosis}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                        {request.requiredWardType}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {request.requiredBedType} Bed
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <img src="https://img.icons8.com/ios-filled/50/94a3b8/time.png" alt="time" className="h-3.5 w-3.5 object-contain" />
                      {timeAgo(request.requestTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                      className="bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10"
                    >
                      Allocate
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>

            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <img src="https://img.icons8.com/ios-filled/50/cbd5e1/error--v1.png" alt="alert" className="h-8 w-8 object-contain" />
                    <p>No pending requests.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <AllocationModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
