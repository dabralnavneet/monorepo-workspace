"use client";

import React from "react";
import { BRANCH_COLORS } from "@/data/positions";

const branches = [
  { key: "executive", label: "Executive" },
  { key: "legislature", label: "Legislature" },
  { key: "judiciary", label: "Judiciary" },
  { key: "constitutional", label: "Constitutional" },
  { key: "local", label: "Local Govt" },
];

export default function LegendPanel() {
  return (
    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
        Branches
      </div>
      <div className="flex flex-col gap-2">
        {branches.map((b) => (
          <div key={b.key} className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: BRANCH_COLORS[b.key] }}
            />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
