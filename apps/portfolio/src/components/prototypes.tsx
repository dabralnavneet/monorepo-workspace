'use client';

import { IconExternalLink, IconRobot, IconActivity } from '@tabler/icons-react';

export default function ProductPrototypes() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* AlterEgo / Digital Twin */}
        <a 
          href="/digital-twin"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex-1 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-500 hover:border-zinc-300 hover:shadow-md hover:-translate-y-2 flex flex-col justify-between"
        >
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 transition-all duration-500 group-hover:bg-zinc-100 group-hover:text-zinc-900">
                <IconRobot size={24} stroke={1.5} />
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-100 transition-colors duration-300">
                <IconExternalLink size={16} stroke={2} />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight group-hover:text-black transition-colors">AlterEgo AI</h3>
              <p className="text-sm font-mono text-zinc-500 mt-1 uppercase tracking-wider">Concept / Digital Twin</p>
              <p className="text-zinc-600 text-sm sm:text-base mt-4 leading-relaxed">
                An exact digital copy acting as an autonomous agent. Designed from a product-first perspective to mitigate cognitive load by automating financial, travel, and support tasks.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-10 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">Vanilla CSS</span>
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">Product Design</span>
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">Landing Page</span>
          </div>
        </a>

        {/* CallbackOS */}
        <a 
          href="/callbackos"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex-1 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-500 hover:border-zinc-300 hover:shadow-md hover:-translate-y-2 flex flex-col justify-between"
        >
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 transition-all duration-500 group-hover:bg-zinc-100 group-hover:text-zinc-900">
                <IconActivity size={24} stroke={1.5} />
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-100 transition-colors duration-300">
                <IconExternalLink size={16} stroke={2} />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight group-hover:text-black transition-colors">CallbackOS</h3>
              <p className="text-sm font-mono text-zinc-500 mt-1 uppercase tracking-wider">Interview Assistant Platform</p>
              <p className="text-zinc-600 text-sm sm:text-base mt-4 leading-relaxed">
                An end-to-end platform for job seekers. Features AI-tailored resume generation, automated job aggregation, and a conversion-focused dashboard designed to optimize interview pipelines and generate leads.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-10 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">Next.js</span>
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">Job Aggregation</span>
            <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">AI Resumes</span>
          </div>
        </a>
      </div>
    </section>
  );
}
