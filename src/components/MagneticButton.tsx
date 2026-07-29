'use client';

import { useRef, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'whatsapp';
};

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    el.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-gold via-amber-400 to-gold text-gray-900 font-semibold glow-ring',
    secondary:
      'glass text-gray-800 font-medium border-white/40 hover:border-gold/50',
    whatsapp:
      'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold',
  };

  const baseClass = `magnetic-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 rounded-2xl text-sm md:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${variants[variant]} ${className}`;

  const content = (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-10 flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
