'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1025] via-[#2d1b4e] to-[#1a1025]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8 relative">
              <div className="w-20 h-20 mx-auto loader-ring" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.div>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              VidhiDiya&apos;s
            </h2>
            <p className="text-gold/80 text-sm md:text-base tracking-widest uppercase mb-8">
              Child Genius Academy
            </p>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-gold via-purple to-sky rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-white/50 text-xs mt-4">Opening the magical universe...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
