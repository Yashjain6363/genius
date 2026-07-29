'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/constants';

const FLOATING = GALLERY_IMAGES.slice(1, 6).map((img, i) => ({
  ...img,
  x: [15, 75, 8, 82, 45][i],
  y: [20, 35, 65, 55, 80][i],
  size: [140, 120, 110, 130, 100][i],
  rotate: [-8, 6, -4, 10, -6][i],
  depth: [0.02, 0.04, 0.03, 0.05, 0.025][i],
}));

function FloatingCard({
  item,
  index,
  mouseX,
  mouseY,
}: {
  item: (typeof FLOATING)[number];
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useTransform(mouseX, (v) => v * item.depth * -80);
  const y = useTransform(mouseY, (v) => v * item.depth * -80);

  return (
    <motion.div
      className="absolute preserve-3d"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: item.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
      transition={{ delay: 2.8 + index * 0.2, duration: 0.8, type: 'spring' }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
        className="polaroid shadow-2xl pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300"
        style={{ width: item.size }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover"
            sizes="150px"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingAcademyImages({ visible }: { visible: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  if (!mounted || !visible) return null;

  return (
    <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden hidden md:block">
      {FLOATING.map((item, i) => (
        <FloatingCard key={item.src} item={item} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}
