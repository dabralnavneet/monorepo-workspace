'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IconHome, IconBriefcase, IconTool, IconMail, IconRocket } from '@tabler/icons-react';

const navItems = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'prototypes', label: 'Products', icon: IconRocket },
  { id: 'toolkit', label: 'Toolkit', icon: IconTool },
  { id: 'experience', label: 'Experience', icon: IconBriefcase },
  { id: 'contact', label: 'Contact', icon: IconMail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if we are at the bottom of the page (for Contact)
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      let foundActive = false;

      // Create an array of elements with their distances from the vertical center of the viewport
      const viewportCenter = window.innerHeight / 3; // Bias towards the top third of the screen

      let closestSection = 'home';
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Distance from the top of the element to our trigger line
          const distance = Math.abs(rect.top - viewportCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        const yOffset = -50; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        className="flex items-center gap-2 px-3 py-3 bg-white/70 backdrop-blur-2xl border border-zinc-200/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredSection(item.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative p-3 sm:p-4 rounded-xl flex items-center justify-center group flex-col focus:outline-none"
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Active Pill Animation Background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-zinc-900 border border-zinc-900 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Glow Effect */}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-zinc-100 border border-zinc-200 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Icon */}
              <Icon
                size={22}
                className={`relative z-10 transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-zinc-500 group-hover:text-zinc-900 group-hover:scale-105'
                }`}
                stroke={isActive ? 2 : 1.5}
              />

              {/* Tooltip on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? -12 : 10,
                  scale: isHovered ? 1 : 0.9
                }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none shadow-xl"
              >
                {item.label}
              </motion.div>
              
              {/* Active Dot Indicator */}
              <div className={`absolute bottom-1 w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-zinc-400 opacity-100' : 'bg-transparent opacity-0'}`} />
            </button>
          );
        })}
      </motion.div>
    </nav>
  );
}
