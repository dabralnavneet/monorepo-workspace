'use client';

import { IconExternalLink, IconRobot, IconActivity } from '@tabler/icons-react';

export default function ProductPrototypes() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* AlterEgo / Digital Twin */}
        <a 
          href="/digital-twin"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:-translate-y-2 flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                <IconRobot size={24} stroke={1.5} />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors duration-300">
                <IconExternalLink size={16} stroke={2} />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-cyan-400 transition-colors">AlterEgo AI</h3>
              <p className="text-sm font-mono text-cyan-400/80 mt-1 uppercase tracking-wider">Concept / Digital Twin</p>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
                An exact digital copy acting as an autonomous agent. Designed from a product-first perspective to mitigate cognitive load by automating financial, travel, and support tasks.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">Vanilla CSS</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">Product Design</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">Landing Page</span>
          </div>
        </a>

        {/* CallbackOS */}
        <a 
          href="/callbackos"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:border-purple-500/30 hover:-translate-y-2 flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <IconActivity size={24} stroke={1.5} />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors duration-300">
                <IconExternalLink size={16} stroke={2} />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors">CallbackOS</h3>
              <p className="text-sm font-mono text-purple-400/80 mt-1 uppercase tracking-wider">Full Stack Platform</p>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
                An end-to-end event resolution dashboard. Demonstrates deep architectural thinking, seamless API integrations, and robust real-time user experiences for production environments.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">Next.js</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">Monorepo</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">E2E Architecture</span>
          </div>
        </a>

      </div>
    </section>
  );
}
