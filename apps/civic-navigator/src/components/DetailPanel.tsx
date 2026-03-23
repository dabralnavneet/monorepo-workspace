"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, ShieldCheck, BookOpen, FileText, ChevronRight, IndianRupee, Clock, Users } from "lucide-react";
import { Position } from "@/data/positions";

type Tab = "overview" | "powers" | "eligibility" | "articles";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: Briefcase },
  { key: "powers", label: "Powers", icon: ShieldCheck },
  { key: "eligibility", label: "Eligibility", icon: BookOpen },
  { key: "articles", label: "Articles", icon: FileText },
];

export default function DetailPanel({
  position,
  onClose,
}: {
  position: Position | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <AnimatePresence>
      {position && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 w-full sm:w-[420px] h-full bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${position.color}15`,
                    color: position.color,
                  }}
                >
                  <Briefcase size={22} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight pr-8">
                    {position.title}
                  </h2>
                  <p className="text-sm text-neutral-500 font-medium mt-0.5">{position.subtitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${position.color}15`,
                        color: position.color,
                      }}
                    >
                      {position.branch}
                    </span>
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      {position.tier}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-100 dark:border-neutral-800 px-6 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                      activeTab === tab.key
                        ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
                        : "border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeTab === "overview" && (
                    <div className="space-y-5">
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {position.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <InfoCard icon={Users} label="Appointed By" value={position.appointedBy} />
                        <InfoCard icon={ChevronRight} label="Reports To" value={position.reportsTo} />
                        <InfoCard icon={Clock} label="Term Length" value={position.termLength} />
                        {position.salary && (
                          <InfoCard icon={IndianRupee} label="Salary" value={position.salary} />
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "powers" && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                        Key Powers & Responsibilities
                      </h3>
                      {position.powers.map((power, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold"
                            style={{
                              backgroundColor: `${position.color}15`,
                              color: position.color,
                            }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {power}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "eligibility" && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                        How to Reach This Position
                      </h3>
                      {position.eligibility.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                        >
                          <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: position.color }} />
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "articles" && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                        Constitutional Articles
                      </h3>
                      {position.articles.map((article, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                        >
                          <FileText size={14} className="shrink-0 mt-0.5" style={{ color: position.color }} />
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                            {article}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={`/position/${position.slug}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: `${position.color}15`,
                  color: position.color,
                }}
              >
                View Full Details
                <ChevronRight size={14} />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={11} className="text-neutral-400" />
        <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">{label}</div>
      </div>
      <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-200 leading-tight">{value}</div>
    </div>
  );
}
