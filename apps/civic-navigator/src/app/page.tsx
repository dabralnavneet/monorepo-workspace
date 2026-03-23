"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight, Search, BookOpen, Shield, Scale, Landmark, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";

const features = [
  {
    icon: Compass,
    title: "Interactive Tree",
    desc: "Zoom, pan, and explore the entire hierarchy from the Constitution down to Gram Panchayats.",
    color: "#f59e0b",
  },
  {
    icon: BookOpen,
    title: "Detailed Role Cards",
    desc: "Powers, eligibility, salary, constitutional articles — everything at a glance.",
    color: "#3b82f6",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "Press ⌘K to jump to any position instantly. Filter by branch, tier, or keyword.",
    color: "#10b981",
  },
  {
    icon: Scale,
    title: "Constitutional Articles",
    desc: "See which articles of the Constitution establish and define each position.",
    color: "#8b5cf6",
  },
];

const pillars = [
  { icon: Shield, label: "Executive", color: "#10b981", count: "7 positions" },
  { icon: Landmark, label: "Legislature", color: "#3b82f6", count: "6 positions" },
  { icon: Scale, label: "Judiciary", color: "#8b5cf6", count: "3 positions" },
  { icon: Users, label: "Local Govt", color: "#14b8a6", count: "3 positions" },
];

export default function LandingPage() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-amber-400/10 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-8">
              <Compass size={14} />
              Open Source Civic Education Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
              Understand India&apos;s{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                Power Structure
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-medium">
              An interactive visual guide to every constitutional position — from the{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-semibold">President</span> to your local{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Gram Panchayat</span>. Know your leaders, their powers, and how they got there.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                Explore the Tree
                <ArrowRight size={16} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}
                >
                  <Icon size={22} />
                </div>
                <span className="font-bold text-sm text-neutral-900 dark:text-white">{p.label}</span>
                <span className="text-xs text-neutral-400 font-medium">{p.count}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 bg-white dark:bg-neutral-900/50 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Built for Learning
            </h2>
            <p className="mt-3 text-neutral-500 font-medium">
              Every feature designed to make civic education accessible and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${f.color}15`, color: f.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Ready to Explore?
          </h2>
          <p className="mt-3 text-neutral-500 font-medium">
            Dive into the interactive tree and discover how India&apos;s democracy works.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Open Civic Navigator
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-amber-500" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">Civic Navigator</span>
          </div>
          <p className="text-xs text-neutral-400">
            Built for civic education. Data sourced from the Constitution of India.
          </p>
        </div>
      </footer>
    </div>
  );
}
