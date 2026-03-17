'use client';

import { IconExternalLink, IconRobot, IconActivity } from '@tabler/icons-react';

export default function ProductPrototypes() {
  return (
    <section className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-0">
      <div className="flex flex-col gap-16 sm:gap-32">
        {/* AlterEgo AI - Exploded View */}
        <div className="relative flex flex-col md:flex-row items-center gap-12 sm:gap-16 group">
          <div className="flex-1 relative order-2 md:order-1">
            {/* Annotation Lines (Visual decoration) */}
            <div className="absolute -top-8 -left-8 w-24 h-[1px] bg-stone-200 hidden md:block"></div>
            <div className="absolute -top-8 -left-8 w-[1px] h-24 bg-stone-200 hidden md:block"></div>
            
            <div className="relative aspect-video overflow-hidden rounded-lg bg-stone-50 border border-stone-100 group-hover:border-stone-300 transition-all duration-700 shadow-sm group-hover:shadow-xl">
               <img 
                 src="/images/alterego-preview.png" 
                 alt="AlterEgo AI Schematic" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute bottom-4 left-4 bg-[#fcfaf8]/90 backdrop-blur-sm border border-stone-200 px-3 py-1 text-[10px] font-mono text-stone-500 uppercase tracking-widest rounded-md hidden md:block">
                 Integrated Agent Schematic v1.0
               </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 order-1 md:order-2">
            <div className="space-y-1 sm:space-y-2">
              <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest border-l-2 border-stone-800 pl-3">Designation: Concept / Digital Twin</span>
              <h3 className="text-2xl sm:text-5xl font-extrabold text-stone-800 tracking-tighter">AlterEgo AI</h3>
            </div>
            
            <p className="text-stone-600 text-sm sm:text-lg leading-relaxed max-w-lg">
              An exact digital copy acting as an autonomous agent. Designed from a product-first perspective to mitigate cognitive load by automating financial, travel, and support tasks.
            </p>

            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-2 sm:pt-4">
              {['Vanilla CSS', 'Product Design', 'Landing Page'].map(tag => (
                <div key={tag} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-stone-300 rotate-45"></span>
                  <span className="font-mono text-[10px] sm:text-xs text-stone-500 uppercase">{tag}</span>
                </div>
              ))}
            </div>

            <a 
              href="/digital-twin"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-4 flex items-center gap-2 text-sm font-bold text-stone-800 group/link"
            >
              EXPLORE SCHEMATIC
              <IconExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* CallbackOS - Exploded View */}
        <div className="relative flex flex-col md:flex-row items-center gap-12 sm:gap-16 group">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest border-l-2 border-stone-800 pl-3">Designation: Interview Platform</span>
              <h3 className="text-2xl sm:text-5xl font-extrabold text-stone-800 tracking-tighter">CallbackOS</h3>
            </div>
            
            <p className="text-stone-600 text-sm sm:text-lg leading-relaxed max-w-lg">
              An end-to-end platform for job seekers. Features AI-tailored resume generation and a conversion-focused dashboard designed to optimize interview pipelines.
            </p>

            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-2 sm:pt-4">
              {['Next.js', 'Job Aggregation', 'AI Resumes'].map(tag => (
                <div key={tag} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-stone-300 rotate-45"></span>
                  <span className="font-mono text-[10px] sm:text-xs text-stone-500 uppercase">{tag}</span>
                </div>
              ))}
            </div>

            <a 
              href="/callbackos"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-4 flex items-center gap-2 text-sm font-bold text-stone-800 group/link"
            >
              EXPLORE SCHEMATIC
              <IconExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -bottom-8 -right-8 w-24 h-[1px] bg-stone-200 hidden md:block"></div>
            <div className="absolute -bottom-8 -right-8 w-[1px] h-24 bg-stone-200 hidden md:block"></div>
            
            <div className="relative aspect-video overflow-hidden rounded-lg bg-stone-50 border border-stone-100 group-hover:border-stone-300 transition-all duration-700 shadow-sm group-hover:shadow-xl">
               <img 
                 src="/images/callbackos-preview.png" 
                 alt="CallbackOS Schematic" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute bottom-4 right-4 bg-[#fcfaf8]/90 backdrop-blur-sm border border-stone-200 px-3 py-1 text-[10px] font-mono text-stone-500 uppercase tracking-widest rounded-md hidden md:block">
                 Workflow Engine Schematic v2.4
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
