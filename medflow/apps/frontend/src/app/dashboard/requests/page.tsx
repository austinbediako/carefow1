"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { motion } from "framer-motion";

export default function RequestsPage() {
  const { requests, initializeData, isHydrated } = useStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!isHydrated) return null;

  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          ED Requests
        </h1>
        <p className="mt-2 text-slate-500">
          Manage pending admission requests from the Emergency Department.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <RequestsTable requests={pendingRequests} />
      </motion.div>
    </div>
  );
}
