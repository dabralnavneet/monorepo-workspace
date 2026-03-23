"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { positions, Position, BRANCH_COLORS } from "@/data/positions";

export default function SearchOverlay({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (position: Position) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else onSelect; // just trigger re-render
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, onSelect]);

  const filtered = positions.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      p.branch.toLowerCase().includes(query.toLowerCase()) ||
      p.tier.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <Search size={18} className="text-neutral-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search positions, branches, tiers..."
                  className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none"
                />
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-sm text-neutral-400">
                    No positions found for &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => {
                        onSelect(pos);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          backgroundColor: `${BRANCH_COLORS[pos.branch]}15`,
                          color: BRANCH_COLORS[pos.branch],
                        }}
                      >
                        {pos.title.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                          {pos.title}
                        </div>
                        <div className="text-xs text-neutral-400 truncate">{pos.subtitle}</div>
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          backgroundColor: `${BRANCH_COLORS[pos.branch]}15`,
                          color: BRANCH_COLORS[pos.branch],
                        }}
                      >
                        {pos.branch}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-medium">
                  {filtered.length} position{filtered.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500">
                    ESC
                  </kbd>
                  <span className="text-[10px] text-neutral-400">to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
