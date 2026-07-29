'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { TIMELINE_STAGES, IMAGES } from '@/lib/constants';

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium text-purple mb-4">
            Our Story
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Where Curiosity Becomes{' '}
            <span className="gradient-text">Genius</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            At VidhiDiya&apos;s, we believe every child carries unlimited potential.
            Our premium programs nurture minds from discovery to achievement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000 group"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl preserve-3d transition-transform duration-500 group-hover:[transform:rotateY(-5deg)_rotateX(3deg)]">
              <Image
                src={IMAGES.classroomAbacus}
                alt="Interactive abacus learning at Child Genius Academy"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-xl">
              <p className="text-2xl font-bold gradient-text">1000+</p>
              <p className="text-xs text-gray-500">Happy Students</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-gray-600 leading-relaxed mb-6">
              Step through our doors into a world where learning feels like magic.
              From abacus mental arithmetic to art, music, and yoga — every program
              is designed to unlock your child&apos;s unique genius.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our Vijaypur academy combines traditional excellence with futuristic
              teaching methods, creating confident, creative, and intelligent young minds.
            </p>
          </motion.div>
        </div>

        {/* 3D Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky via-gold to-purple -translate-x-1/2" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {TIMELINE_STAGES.map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="relative text-center group"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                    boxShadow: `0 10px 30px ${item.color}44`,
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{item.stage}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                {i < TIMELINE_STAGES.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <span className="text-2xl text-gray-300">↓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
