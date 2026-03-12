'use client';

export default function WorkExperience() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="relative pl-8 sm:pl-20 border-l border-zinc-200 ml-4 sm:ml-10 space-y-12 sm:space-y-16">
        {/* BMW Techworks India */}
        <div className="relative group">
          {/* Timeline Node */}
          <div className="absolute -left-[37px] sm:-left-[85px] top-0 w-9 sm:w-14 h-9 sm:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center overflow-hidden z-20 group-hover:border-zinc-900 transition-colors duration-500 shadow-sm">
            <img src="/images/bmw.png" alt="BMW" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 sm:gap-2">
              <h3 className="text-xl sm:text-3xl font-bold text-zinc-900 tracking-tight">BMW Techworks India</h3>
              <span className="font-mono text-[10px] sm:text-sm text-zinc-400 uppercase tracking-widest mt-1 sm:mt-0">May 2025 — Present</span>
            </div>
            <p className="text-base sm:text-lg text-zinc-500 font-medium">Senior Software Engineer</p>
            
            <ul className="mt-6 text-sm sm:text-base text-zinc-600 space-y-4 leading-relaxed max-w-2xl">
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Set up Angular and NestJS repositories from scratch, establishing <span className="text-zinc-900 font-medium">CI pipelines</span>.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Implemented Helm-based deployment pipelines to <span className="text-zinc-900 font-medium">AWS EKS</span> with standardized manifests.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Led a <span className="text-zinc-900 font-medium">5-member engineering team</span>; owned sprint planning and backlog refinement.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Represented the team in weekly tech roundtables for <span className="text-zinc-900 font-medium">cross-team alignment</span>.
              </li>
            </ul>
          </div>
        </div>

        {/* C2FO */}
        <div className="relative group">
          <div className="absolute -left-[37px] sm:-left-[85px] top-0 w-9 sm:w-14 h-9 sm:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center overflow-hidden z-20 group-hover:border-zinc-900 transition-colors duration-500 shadow-sm">
            <img src="/images/c2fo.png" alt="C2FO" className="w-7 sm:w-10 h-7 sm:h-10 object-contain" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 sm:gap-2">
              <h3 className="text-xl sm:text-3xl font-bold text-zinc-900 tracking-tight">C2FO</h3>
              <span className="font-mono text-[10px] sm:text-sm text-zinc-400 uppercase tracking-widest mt-1 sm:mt-0">Mar 2021 — Apr 2025</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base sm:text-lg text-zinc-500 font-medium italic">Software Engineer II <span className="text-zinc-400 font-normal not-italic text-sm ml-2">(2022-2025)</span></p>
              <p className="text-sm text-zinc-400 font-medium">Software Engineer I <span className="text-zinc-300 font-normal ml-2">(2021-2022)</span></p>
            </div>
            
            <ul className="mt-6 text-sm sm:text-base text-zinc-600 space-y-4 leading-relaxed max-w-2xl">
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Increased registration conversion by <strong className="text-zinc-900">25%</strong> by redesigning the acquisition funnel.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Reduced LCP by <strong className="text-zinc-900">~60%</strong> (5s to 2s) using critical CSS and performance optimization.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Led migration of <span className="text-zinc-900 font-medium">100+ Gatsby SSG sites</span> to Next.js for better maintainability.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Migrated CI/CD to GitHub Actions, reducing infrastructure costs by <strong className="text-zinc-900">~20%</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Reliance Jio */}
        <div className="relative group">
          <div className="absolute -left-[37px] sm:-left-[85px] top-0 w-9 sm:w-14 h-9 sm:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center overflow-hidden z-20 group-hover:border-zinc-900 transition-colors duration-500 shadow-sm">
            <img src="/images/jio.png" alt="Reliance Jio" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 sm:gap-2">
              <h3 className="text-xl sm:text-3xl font-bold text-zinc-900 tracking-tight">Reliance Jio</h3>
              <span className="font-mono text-[10px] sm:text-sm text-zinc-400 uppercase tracking-widest mt-1 sm:mt-0">Jul 2019 — Feb 2021</span>
            </div>
            <p className="text-base sm:text-lg text-zinc-500 font-medium">Software Engineer I</p>
            
            <ul className="mt-6 text-sm sm:text-base text-zinc-600 space-y-4 leading-relaxed max-w-2xl">
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Developed Jio Payment Bank portal using React Native Web for <strong className="text-zinc-900">100k+ merchants</strong>.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-[1px] before:bg-zinc-300">
                Delivered cross-platform applications achieving <strong className="text-zinc-900">70% code reuse</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
