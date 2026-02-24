"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, User, Bed, Clock } from "lucide-react";

function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

export default function AuditPage() {
  const { logs, initializeData, isHydrated } = useStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!isHydrated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Audit Logs
        </h1>
        <p className="mt-2 text-slate-500">
          Traceability of all actions performed within the system.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-[600px] overflow-y-auto">
          <ul className="divide-y divide-slate-100">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.li
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
                    <Activity className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="flex-auto">
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm font-semibold leading-6 text-slate-900">
                        {log.action}
                      </p>
                      <p className="flex-none text-xs text-slate-500">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {timeAgo(log.timestamp)}
                      </p>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                      <span className="font-medium text-slate-900 mr-1">
                        [{log.userRole}]
                      </span>
                      {log.details}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>

            {logs.length === 0 && (
                <li className="p-8 text-center text-slate-500">No logs recorded yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
