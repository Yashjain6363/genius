'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GALLERY_IMAGES } from '@/lib/constants';

const ScrollGallery3D = dynamic(() => import('./three/ScrollGallery3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="loader-ring w-12 h-12" />
    </div>
  ),
});

function PolaroidCard({
  image,
  index,
  onClick,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const rotations = [-4, 3, -2, 5, -3, 2, -5, 4, -1];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotate: rotations[index % rotations.length] }
          : {}
      }
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      onClick={onClick}
      className="polaroid cursor-pointer transition-shadow hover:shadow-2xl"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="polaroid-caption">{image.title}</p>
    </motion.div>
  );
}

export default function GalleryExperience() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<(typeof GALLERY_IMAGES)[number] | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isDesktop) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight))
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  return (
    <section id="gallery" ref={sectionRef} className="relative overflow-hidden">
      {/* 3D scroll gallery — Tabasco-style on desktop */}
      {isDesktop && (
        <div className="hidden lg:block h-[150vh] relative">
          <div className="sticky top-0 h-screen">
            <ScrollGallery3D
              images={GALLERY_IMAGES.map((g) => ({ src: g.src, title: g.title }))}
              scrollProgress={scrollProgress}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#faf8ff]/80 via-transparent to-[#faf8ff]/90" />
          </div>
        </div>
      )}

      <div className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium text-creative mb-4">
              📸 Memory Wall
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Moments of{' '}
              <span className="gradient-text">Genius</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Real smiles. Real achievements. Click any photo to explore.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {GALLERY_IMAGES.map((image, i) => (
              <PolaroidCard
                key={image.src}
                image={image}
                index={i}
                onClick={() => setSelected(image)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -90 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative max-w-3xl w-full preserve-3d"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="polaroid max-w-lg mx-auto">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={selected.src}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
                <p className="polaroid-caption text-base">{selected.title}</p>
                <p className="text-center text-gray-400 text-sm">{selected.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
