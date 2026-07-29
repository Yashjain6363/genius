'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FloatingAcademyImages from './FloatingAcademyImages';
import HandRevealPhotos from './HandRevealPhotos';
import MagneticButton from './MagneticButton';
import { IMAGES } from '@/lib/constants';

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

const HEADLINE_WORDS = ['Unlock', 'The', 'Genius', 'Inside', 'Every', 'Child'];

export default function HeroWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portalScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const doorTimer = setTimeout(() => setDoorsOpen(true), 800);
    const sceneTimer = setTimeout(() => setShow3D(true), 2000);
    return () => {
      clearTimeout(doorTimer);
      clearTimeout(sceneTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      {/* Portal backdrop — first image as cinematic entrance */}
      <motion.div
        style={{ scale: portalScale, opacity: portalOpacity }}
        className="absolute inset-0 z-[1]"
      >
        <Image
          src={IMAGES.heroPortal}
          alt="Welcome to VidhiDiya's Child Genius Academy"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#faf8ff]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2314]/40 via-transparent to-[#3D2314]/40" />
      </motion.div>

      {/* Animated portal doors */}
      <div className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center">
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1/2 origin-left"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: doorsOpen ? -85 : 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="h-full w-full bg-gradient-to-r from-[#3D2314] to-[#2a1810] border-r-4 border-[#C9A227]/50 shadow-2xl">
            <div className="h-full w-full grid grid-cols-4 grid-rows-6 gap-2 p-4 opacity-60">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-[#C9A227]/30 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#C9A227]/60" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1/2 origin-right"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: doorsOpen ? 85 : 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="h-full w-full bg-gradient-to-l from-[#3D2314] to-[#2a1810] border-l-4 border-[#C9A227]/50 shadow-2xl">
            <div className="h-full w-full grid grid-cols-4 grid-rows-6 gap-2 p-4 opacity-60">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-[#C9A227]/30 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#C9A227]/60" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D floating universe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show3D ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-[3]"
      >
        <HeroScene />
      </motion.div>

      {/* Photos flip out from main character's hands */}
      <HandRevealPhotos active={show3D} />

      {/* Tabasco-style floating academy photos with mouse parallax */}
      <FloatingAcademyImages visible={show3D} />

      {/* Hero content — shifted further down and made compact so the background image is fully visible */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-end min-h-[100dvh] px-4 pb-8 md:pb-12 text-center"
      >
        <AnimatePresence>
          {show3D && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative py-4 md:py-6 px-5 md:px-10 bg-white/20 md:bg-white/25 backdrop-blur-[20px] border border-white/30 rounded-[24px] md:rounded-[32px] shadow-[0_24px_50px_rgba(0,0,0,0.06)] max-w-4xl w-full flex flex-col items-center mb-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="glass rounded-full px-4 py-1.5 mb-3 md:mb-4 text-xs font-medium text-gray-700 bg-white/40"
              >
                ✨ Vijaypur&apos;s Premium Child Development Academy
              </motion.div>

              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight mb-4">
                {HEADLINE_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.4 + i * 0.12,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block mr-[0.25em] ${
                      ['Genius', 'Child'].includes(word) ? 'gradient-text' : 'text-gray-900'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl mb-6 text-balance"
              >
                Building intelligent, confident and creative minds through innovative learning programs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <MagneticButton href="#contact" variant="primary">
                  ✨ Book Free Counselling
                </MagneticButton>
                <MagneticButton href="#courses" variant="secondary">
                  🚀 Explore Learning Universe
                </MagneticButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 scale-75 md:scale-90"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
