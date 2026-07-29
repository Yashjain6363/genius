'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DEVELOPMENT_BENEFITS } from '@/lib/constants';

function BrainVisual({ active }: { active: boolean }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      <motion.div
        animate={active ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple/20 via-sky/20 to-gold/20 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="text-[120px] md:text-[160px] select-none filter drop-shadow-2xl">
          🧠
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={
              active
                ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: ['#FFD54F', '#FF5252', '#29B6F6', '#66BB6A', '#AB47BC'][i],
              top: `${20 + i * 15}%`,
              left: `${10 + (i % 2) * 70}%`,
              boxShadow: `0 0 20px ${['#FFD54F', '#FF5252', '#29B6F6', '#66BB6A', '#AB47BC'][i]}`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function ChildDevelopment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white/50 to-purple/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium text-fresh mb-4">
              Holistic Growth
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Nurturing{' '}
              <span className="gradient-text">Whole-Brain</span>{' '}
              Development
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our integrated approach develops cognitive abilities, creativity,
              and emotional intelligence — preparing children for lifelong success.
            </p>

            <div className="space-y-4">
              {DEVELOPMENT_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 glass rounded-2xl p-4 hover:scale-[1.02] transition-transform"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                    <p className="text-sm text-gray-500">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <BrainVisual active={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
