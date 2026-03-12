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
    title: 'Frontend',
    description: 'Crafting responsive, beautiful interfaces and mobile applications',
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
    title: 'Backend & Data',
    description: 'Architecting scalable server logic and managing complex data flow',
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
    title: 'Cloud & DevOps',
    description: 'Deploying, monitoring, and scaling applications in the cloud',
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
    <div className="w-full flex flex-col mt-4 sm:mt-8 mb-16 px-2 max-w-4xl mx-auto">

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {techGroups.map((group, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === index
              ? 'bg-zinc-900 text-white shadow-md scale-105 border border-zinc-900'
              : 'bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 hover:scale-105'
              }`}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="relative bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden min-h-[380px] sm:min-h-[320px] flex flex-col items-center group/container">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center w-full relative z-10"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
                {techGroups[activeTab].title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
                {techGroups[activeTab].description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-3xl">
              {techGroups[activeTab].technologies.map(({ Icon, name }, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center gap-3 cursor-default"
                >
                  <div className="flex items-center justify-center p-4 rounded-2xl bg-zinc-50 shadow-sm border border-zinc-100 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg text-zinc-600 relative overflow-hidden">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 opacity-80 group-hover:opacity-100 transition-opacity relative z-10" stroke={1.5} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-zinc-500 group-hover:text-zinc-900 transition-all">
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
