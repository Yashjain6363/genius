'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <nav
          className={`mx-4 md:mx-8 lg:mx-12 flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass shadow-lg' : 'bg-transparent'
          }`}
        >
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-bounce">🎓</span>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-sm md:text-base leading-tight">
                VidhiDiya&apos;s
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 tracking-wide">
                Child Genius Academy
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-purple transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-purple group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton href="#contact" variant="primary" className="!py-2.5 !px-5 !text-sm">
              ✨ Book Counselling
            </MagneticButton>
          </div>

          <button
            type="button"
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span
              className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 glass rounded-2xl p-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-lg font-medium border-b border-white/20 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4">
              <MagneticButton href="#contact" variant="primary" className="w-full">
                ✨ Book Counselling
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
