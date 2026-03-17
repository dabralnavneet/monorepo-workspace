'use client';

import { motion } from 'motion/react';

const ghostWords = [
  { text: 'AI', size: 'text-4xl md:text-6xl', top: '15%', left: '10%', delay: 0 },
  { text: 'Product Mindset', size: 'text-2xl md:text-3xl', top: '25%', left: '70%', delay: 1.5 },
  { text: '0 to 100', size: 'text-3xl md:text-5xl', top: '65%', left: '15%', delay: 3 },
  { text: 'Scalability', size: 'text-2xl md:text-4xl', top: '55%', left: '80%', delay: 0.5 },
  { text: 'Foundational', size: 'text-xl md:text-2xl', top: '80%', left: '40%', delay: 2 },
  { text: 'Full Stack', size: 'text-2xl md:text-3xl', top: '10%', left: '45%', delay: 4 },
];

export default function FloatingGhostText() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {ghostWords.map((word, index) => (
        <motion.div
          key={index}
          className={`absolute font-extrabold text-stone-800/[0.04] uppercase tracking-[0.3em] ${word.size} z-10`}
          style={{ top: word.top, left: word.left, fontFamily: "'Google Sans Flex', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            y: [-40, 40, -40],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: word.delay,
            ease: "easeInOut",
          }}
        >
          {word.text}
        </motion.div>
      ))}
    </div>
  );
}
