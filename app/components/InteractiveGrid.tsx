'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InteractiveGridProps {
  mousePosition: { x: number; y: number };
}

export default function InteractiveGrid({ mousePosition }: InteractiveGridProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const rows = 20;
  const cols = 40;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <svg className="w-full h-full" style={{ background: 'transparent' }}>
        {/* Vertical lines */}
        {Array.from({ length: cols }).map((_, i) => {
          const x = (i * 100) / cols;
          const distanceFromMouse = Math.abs(mousePosition.x - (dimensions.width * x) / 100);
          const opacity = Math.max(0.1, 1 - distanceFromMouse / 300);

          return (
            <motion.line
              key={`v-${i}`}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="#667eea"
              strokeWidth="1"
              animate={{ opacity }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Horizontal lines */}
        {Array.from({ length: rows }).map((_, i) => {
          const y = (i * 100) / rows;
          const distanceFromMouse = Math.abs(mousePosition.y - (dimensions.height * y) / 100);
          const opacity = Math.max(0.1, 1 - distanceFromMouse / 300);

          return (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="#764ba2"
              strokeWidth="1"
              animate={{ opacity }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
