'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { BRAND } from '@/lib/constants';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const whatsappUrl = `https://wa.me/91${BRAND.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like to book a free counselling session for my child at VidhiDiya's Child Genius Academy."
  )}`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky/5 to-gold/10" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium text-sky mb-4">
            📞 Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Begin Your Child&apos;s{' '}
            <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Futuristic desk */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="perspective-1000"
        >
          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden preserve-3d">
            {/* Desk surface effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gold/10 pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🎓</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{BRAND.fullName}</h3>
                    <p className="text-gray-500 text-sm">Premium Child Development</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                      📍
                    </span>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-500">Vijaypur, India</p>
                    </div>
                  </div>
                  {BRAND.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+91${phone}`}
                      className="flex items-center gap-3 group"
                    >
                      <span className="w-10 h-10 rounded-xl bg-sky/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        📱
                      </span>
                      <div>
                        <p className="font-medium group-hover:text-sky transition-colors">
                          +91 {phone}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <MagneticButton href={whatsappUrl} variant="whatsapp" className="w-full">
                  💬 WhatsApp Now
                </MagneticButton>
                <MagneticButton href={`tel:+91${BRAND.phones[0]}`} variant="primary" className="w-full">
                  ✨ Book Free Counselling
                </MagneticButton>
                <p className="text-center text-xs text-gray-400 mt-2">
                  Free counselling • No obligation • Expert guidance
                </p>
              </div>
            </div>

            {/* Decorative 3D desk items */}
            <div className="absolute -bottom-2 -right-2 text-6xl opacity-20 pointer-events-none select-none">
              ✏️
            </div>
            <div className="absolute -top-2 -left-2 text-5xl opacity-20 pointer-events-none select-none">
              📚
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-16 pt-8 border-t border-gray-200/50 text-center">
        <p className="font-display font-semibold text-gray-700 mb-2">
          {BRAND.fullName}
        </p>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved. Unlock the genius inside every child.
        </p>
      </footer>
    </section>
  );
}
