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
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-zinc-100"></div>
        {techGroups.map((group, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 text-[10px] sm:text-base font-mono uppercase tracking-[0.2em] transition-all duration-300 relative ${activeTab === index
              ? 'text-zinc-900 font-bold'
              : 'text-zinc-400 hover:text-zinc-600'
              }`}
          >
            {group.title}
            {activeTab === index && (
              <motion.div 
                layoutId="activeLayer"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" 
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
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start justify-between mb-8 sm:mb-16 pl-4 border-l-2 border-zinc-900">
               <div className="max-w-md">
                 <h3 className="text-xl sm:text-3xl font-black text-zinc-900 mb-2 sm:mb-4 tracking-tighter uppercase italic text-nowrap">
                   SPEC_MODULE // 0x0{activeTab + 1}
                 </h3>
                 <p className="text-sm sm:text-lg text-zinc-500 font-medium leading-relaxed">
                   {techGroups[activeTab].description}
                 </p>
               </div>
               
               <div className="hidden md:flex flex-col gap-1 items-end pt-2">
                 <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.3em]">Revision: 04.0b</span>
                 <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.3em]">Datum: Grid.7.4</span>
               </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
              {techGroups[activeTab].technologies.map(({ Icon, name }, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center gap-3 sm:gap-4 cursor-default"
                >
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 group-hover:bg-white group-hover:border-zinc-900 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-md">
                    {/* Minimal Leader Lines on Hover */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-[1px] h-4 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <Icon className="h-6 w-6 sm:h-10 sm:w-10 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-500" stroke={1.5} />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-900 transition-colors text-center px-1">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
