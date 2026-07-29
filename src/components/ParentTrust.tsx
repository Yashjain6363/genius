'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { TESTIMONIALS, IMAGES } from '@/lib/constants';

function SpeechBubble({
  quote,
  author,
  role,
  index,
}: {
  quote: string;
  author: string;
  role: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="perspective-1000"
    >
      <div className="relative glass rounded-3xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300 preserve-3d">
        <div className="absolute -top-3 left-8 w-6 h-6 bg-white/20 backdrop-blur-xl rotate-45 border-l border-t border-white/25" />
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-gold text-lg">
              ★
            </span>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-purple flex items-center justify-center text-white font-bold">
            {author[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ParentTrust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-purple/5" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium text-gold mb-4">
            💬 Parent Trust
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="gradient-text">Families</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <Image
              src={IMAGES.medalsAwards}
              alt="Students with medals and certificates"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-display text-xl font-bold">Award-Winning Students</p>
              <p className="text-white/80 text-sm">Medals, certificates & national recognition</p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <SpeechBubble key={t.author} {...t} index={i} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(2).map((t, i) => (
            <SpeechBubble key={t.author} {...t} index={i + 2} />
          ))}
        </div>

        {/* Achievement stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { value: '1000+', label: 'Students Trained' },
            { value: '14+', label: 'Programs Offered' },
            { value: '100+', label: 'Awards Won' },
            { value: '20+', label: 'Years Excellence' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
