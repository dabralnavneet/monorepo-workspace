'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { IconHome, IconBriefcase, IconTool, IconMail, IconRocket } from '@tabler/icons-react';

const navItems = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'prototypes', label: 'Products', icon: IconRocket },
  { id: 'toolkit', label: 'Toolkit', icon: IconTool },
  { id: 'experience', label: 'Experience', icon: IconBriefcase },
  { id: 'contact', label: 'Contact', icon: IconMail },
];

// ── Magnetic Button ────────────────────────────────────────────
function MagneticButton({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  'aria-label': string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    rawX.set(dx);
    rawY.set(dy);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    onMouseLeave();
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-3 sm:p-4 rounded-xl flex items-center justify-center group flex-col focus:outline-none"
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}


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
        className="flex items-center gap-2 px-3 py-3 bg-[#fcfaf8]/70 backdrop-blur-2xl border border-stone-200/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredSection === item.id;

          return (
            <MagneticButton
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredSection(item.id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Active Pill Animation Background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-stone-800 border border-stone-800 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Glow Effect */}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-stone-100 border border-stone-200 rounded-xl"
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
                    : 'text-stone-500 group-hover:text-stone-800 group-hover:scale-105'
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
                className="absolute -top-10 px-3 py-1.5 bg-stone-800 border border-stone-800 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none shadow-xl"
              >
                {item.label}
              </motion.div>
              
              {/* Active Dot Indicator */}
              <div className={`absolute bottom-1 w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-stone-400 opacity-100' : 'bg-transparent opacity-0'}`} />
            </MagneticButton>
          );
        })}
      </motion.div>
    </nav>
  );
}
