'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconBrandDocker,
  IconBrandAws,
  IconBrandTailwind,
  IconBrandReact,
  IconBrandGraphql,
  IconBrandTypescript,
  IconBrandGit,
  IconBrandVscode,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandFramerMotion,
  IconBrandGithub,
  IconBrandStorybook,
  IconBrandAngular,
  IconBrandMongodb,
  IconBrandReactNative,
  IconServer,
  IconApi
} from '@tabler/icons-react';

const techGroups = [
  {
    title: 'Presentation Layer',
    description: 'Engineering immersive interface architectures and high-fidelity mobile experiences',
    technologies: [
      { name: 'React', Icon: IconBrandReact },
      { name: 'React Native', Icon: IconBrandReactNative },
      { name: 'Angular', Icon: IconBrandAngular },
      { name: 'TypeScript', Icon: IconBrandTypescript },
      { name: 'Tailwind CSS', Icon: IconBrandTailwind },
      { name: 'Motion', Icon: IconBrandFramerMotion },
      { name: 'Storybook', Icon: IconBrandStorybook },
    ]
  },
  {
    title: 'Core Logic & Infrastructure',
    description: 'Architecting scalable service logic and robust data persistence systems',
    technologies: [
      { name: 'Node.js', Icon: IconBrandNodejs },
      { name: 'GraphQL', Icon: IconBrandGraphql },
      { name: 'REST APIs', Icon: IconApi },
      { name: 'MongoDB', Icon: IconBrandMongodb },
      { name: 'JavaScript', Icon: IconBrandJavascript },
      { name: 'Servers', Icon: IconServer },
    ]
  },
  {
    title: 'Systems & Orchestration',
    description: 'Automating deployment pipelines and orchestrating cloud-native environments',
    technologies: [
      { name: 'AWS', Icon: IconBrandAws },
      { name: 'Docker', Icon: IconBrandDocker },
      { name: 'CI/CD', Icon: IconBrandGithub },
      { name: 'Git', Icon: IconBrandGit },
      { name: 'VS Code', Icon: IconBrandVscode },
    ]
  }
];

export const Tech = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full flex flex-col mt-4 sm:mt-8 px-2 max-w-6xl mx-auto">
      {/* Schematic Layers (Tab Navigation) */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-16 relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-stone-100"></div>
        {techGroups.map((group, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 text-[10px] sm:text-base font-mono uppercase tracking-[0.2em] transition-all duration-300 relative ${activeTab === index
              ? 'text-stone-800 font-bold'
              : 'text-stone-400 hover:text-stone-600'
              }`}
          >
            {group.title}
            {activeTab === index && (
              <motion.div 
                layoutId="activeLayer"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Schematic Board Area */}
      <div className="relative min-h-[400px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >


            {/* Architectural Orrery Layout */}
            <div className="relative w-full max-w-3xl mx-auto h-[400px] sm:h-[500px] flex items-center justify-center mt-4 sm:mt-8 mb-8 sm:mb-16">
              
              {/* Outer Orbit Ring */}
              <div 
                className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-stone-300 border-dashed opacity-50"
                style={{ animation: 'spin 60s linear infinite' }}
              ></div>
              
              {/* Inner Orbit Ring */}
              <div 
                className="absolute w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] rounded-full border border-stone-200"
              ></div>
              
              {/* Central Mechanical Core */}
              <div className="absolute z-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#fdfbf9] flex items-center justify-center shadow-inner border border-stone-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-stone-200 border-dashed flex items-center justify-center p-2" style={{ animation: 'spin 30s linear infinite reverse' }}>
                  <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-stone-800 shadow-[0_0_15px_rgba(28,25,23,0.5)] animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Orbiting Planets (Technologies) */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ animation: 'spin 40s linear infinite' }}
              >
                {techGroups[activeTab].technologies.map(({ Icon, name }, idx) => {
                  const total = techGroups[activeTab].technologies.length;
                  const angle = (idx / total) * 360;
                  
                  return (
                    <div
                      key={idx}
                      className="absolute group cursor-default z-10"
                      style={{
                        transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(140px, 28vw, 210px)))`
                      }}
                      onMouseEnter={(e) => {
                        const parent = e.currentTarget.parentElement;
                        const reverse = e.currentTarget.children[0] as HTMLElement;
                        if (parent) parent.style.animationPlayState = 'paused';
                        if (reverse) reverse.style.animationPlayState = 'paused';
                      }}
                      onMouseLeave={(e) => {
                        const parent = e.currentTarget.parentElement;
                        const reverse = e.currentTarget.children[0] as HTMLElement;
                        if (parent) parent.style.animationPlayState = 'running';
                        if (reverse) reverse.style.animationPlayState = 'running';
                      }}
                    >
                      <div style={{ animation: 'spin 40s linear infinite reverse' }}>
                        <div style={{ transform: `rotate(-${angle}deg)` }}>
                          <div className="relative w-14 h-14 sm:w-[72px] sm:h-[72px] flex items-center justify-center rounded-full bg-[#fcfaf8] border border-stone-300 group-hover:bg-stone-800 group-hover:border-stone-800 group-hover:scale-110 transition-all duration-300 shadow-sm z-10">
                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-stone-500 group-hover:text-stone-100 transition-colors duration-300" stroke={1.5} />
                            
                            {/* Sleek Hover Badge */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
                              <span className="px-3 py-1.5 bg-[#fdfbf9] border border-stone-200 text-stone-600 text-[10px] font-mono uppercase tracking-widest rounded shadow-md">
                                {name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
