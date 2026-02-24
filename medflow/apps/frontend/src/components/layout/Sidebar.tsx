"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bed,
  Users,
  Activity,
  LogOut,
  ClipboardList
} from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { label: "ED Requests", href: "/dashboard/requests", icon: Users },
  { label: "Ward View", href: "/dashboard/wards", icon: Bed },
  { label: "Discharges", href: "/dashboard/discharges", icon: LogOut },
  { label: "Audit Logs", href: "/dashboard/audit", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-16 w-full items-center border-b border-slate-100 px-6 bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/30">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            MedFlow
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive ? "text-white shadow-lg shadow-blue-900/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-[12px] bg-slate-900"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon
                  className={clsx(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="rounded-[16px] bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm ring-2 ring-white shadow-sm">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Dr. John Doe</p>
              <p className="text-[11px] font-medium text-slate-500">Chief Medical Officer</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
