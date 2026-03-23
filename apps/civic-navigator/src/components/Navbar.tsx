"use client";

import React from "react";
import { Search, Sun, Moon, Compass, Home } from "lucide-react";
import Link from "next/link";

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch?: () => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-neutral-200/50 dark:border-neutral-800/50 px-5 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Compass size={16} className="text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Civic Navigator
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Home size={14} />
            Home
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Compass size={14} />
            Explore
          </Link>

          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Search size={13} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] font-mono bg-white dark:bg-neutral-700 rounded shadow-sm">
                ⌘K
              </kbd>
            </button>
          )}

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
