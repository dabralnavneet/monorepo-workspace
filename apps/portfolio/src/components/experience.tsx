'use client';

export default function WorkExperience() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-6">
        {/* BMW Techworks India Experience */}
        <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-cyan-500/30 transition-all duration-500 shadow-inner">
                <img
                  src="/images/bmw.png"
                  alt="BMW"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight group-hover:text-cyan-400 transition-colors">BMW Techworks India</h3>
                <p className="text-sm sm:text-base text-zinc-400 font-medium mt-1">Senior Software Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-400/80 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              May 2025 – Present
            </div>
          </div>

          <ul className="relative z-10 mt-6 text-sm sm:text-base text-zinc-400 list-disc list-inside space-y-3 leading-relaxed marker:text-purple-500">
            <li>Set up Angular and NestJS repositories from scratch, establishing project structure and GitHub Actions CI pipelines.</li>
            <li>Implemented Helm-based deployment pipelines to AWS EKS with standardized manifests and rollout strategies.</li>
            <li>Led a 5-member engineering team; owned sprint planning and backlog refinement.</li>
            <li>Represented the team in a weekly tech roundtable to align cross-team technical decisions.</li>
          </ul>
        </div>

        {/* C2FO Experience */}
        <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-purple-500/30 transition-all duration-500 shadow-inner">
                <img
                  src="/images/c2fo.png"
                  alt="C2FO"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors">C2FO</h3>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-sm sm:text-base text-zinc-400 font-medium flex items-center gap-2">
                    Software Engineer II <span className="text-zinc-600 text-xs font-mono">• Mar 2022 – Apr 2025</span>
                  </p>
                  <p className="text-sm sm:text-base text-zinc-500 font-medium flex items-center gap-2">
                    Software Engineer I <span className="text-zinc-600 text-xs font-mono">• Mar 2021 – Feb 2022</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="relative z-10 mt-6 text-sm sm:text-base text-zinc-400 list-disc list-inside space-y-3 leading-relaxed marker:text-cyan-500">
            <li>Increased registration conversion by <strong className="text-zinc-200">25%</strong> by redesigning the customer acquisition funnel.</li>
            <li>Reduced LCP by <strong className="text-zinc-200">~60%</strong> (from ~5s to ~2s) on the onboarding page using critical CSS and optimization.</li>
            <li>Led migration of 100+ Gatsby SSG sites to Next.js to improve maintainability.</li>
            <li>Built a reusable MUI component library adopted by 5+ product teams.</li>
            <li>Migrated CI/CD from Azure DevOps to GitHub Actions, reducing platform costs by <strong className="text-zinc-200">~20%</strong>.</li>
          </ul>
        </div>

        {/* Reliance Jio Experience */}
        <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-blue-500/30 transition-all duration-500 shadow-inner">
                <img
                  src="/images/jio.png"
                  alt="Reliance Jio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight group-hover:text-blue-400 transition-colors">Reliance Jio</h3>
                <p className="text-sm sm:text-base text-zinc-400 font-medium mt-1">Software Engineer I</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
              Jul 2019 – Feb 2021
            </div>
          </div>

          <ul className="relative z-10 mt-6 text-sm sm:text-base text-zinc-400 list-disc list-inside space-y-3 leading-relaxed marker:text-zinc-600">
            <li>Developed Jio Payment Bank merchant portal using React Native Web supporting <strong className="text-zinc-200">100,000+</strong> merchants.</li>
            <li>Deployed and configured the portal on NGINX/Ubuntu servers.</li>
            <li>Delivered cross-platform React Native applications achieving <strong className="text-zinc-200">~60-70%</strong> code reuse.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
