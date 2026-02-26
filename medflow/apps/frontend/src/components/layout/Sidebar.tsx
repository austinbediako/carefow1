"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Command Center", href: "/dashboard", icon: "https://img.icons8.com/ios-filled/50/ffffff/dashboard.png" },
  { label: "ED Requests", href: "/dashboard/requests", icon: "https://img.icons8.com/ios-filled/50/ffffff/user-group-man-man.png" },
  { label: "Ward View", href: "/dashboard/wards", icon: "https://img.icons8.com/ios-filled/50/ffffff/hospital-bed.png" },
  { label: "Discharges", href: "/dashboard/discharges", icon: "https://img.icons8.com/ios-filled/50/ffffff/up-right-arrow.png" },
  { label: "Audit Logs", href: "/dashboard/audit", icon: "https://img.icons8.com/ios-filled/50/ffffff/clipboard.png" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole } = useStore();

  const handleLogout = () => {
    setRole(null);
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-16 w-full items-center border-b border-slate-100 px-6 bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1.png"
            alt="KBTH Logo"
            className="h-10 w-auto object-contain"
          />
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
                <img
                  src={item.icon}
                  alt={item.label}
                  className={clsx(
                    "h-5 w-5 transition-all",
                    isActive ? "opacity-100" : "opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80"
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
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-sm ring-2 ring-white shadow-sm">
                JD
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Dr. John Doe</p>
                <p className="text-[11px] font-medium text-slate-500 truncate">Chief Medical Officer</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <img src="https://img.icons8.com/ios-filled/50/94a3b8/logout-rounded.png" alt="logout" className="h-5 w-5 object-contain group-hover:hidden" />
              <img src="https://img.icons8.com/ios-filled/50/dc2626/logout-rounded.png" alt="logout hover" className="h-5 w-5 object-contain hidden group-hover:block" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
