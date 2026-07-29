'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COURSES } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

/* ── Split: 2 featured flip + rest in marquee ── */
const FEATURED_COURSES = COURSES.filter(
  (c) => c.id === 'abacus' || c.id === 'dmit'
);
const MARQUEE_COURSES = COURSES.filter(
  (c) => c.id !== 'abacus' && c.id !== 'dmit'
);

/* ── Touch detection hook ── */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);
  return isTouch;
}

/* ── Shared helper: map mouse position to 0..1 over element ── */
function getRelativeMouse(e: React.MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top) / rect.height,
  };
}

/* ═══════════════════════════════════════════════════════════════
   3D Featured Flip Card
   — Desktop: mouse-tracking tilt + light + hover flip
   — Mobile: tap to flip, no tilt effects
   ═══════════════════════════════════════════════════════════════ */
function HoverFlipCard({ course }: { course: (typeof COURSES)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const isTouch = useIsTouchDevice();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  /* ── Sync flip when state changes ── */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: flipped ? 180 : 0,
      duration: 0.7,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
  }, [flipped]);

  /* ── Mouse move → tilt + light + shadow (desktop only) ── */
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      const wrap = wrapRef.current;
      const card = cardRef.current;
      if (!wrap || !card) return;

      const { x, y } = getRelativeMouse(e, wrap);
      const tiltX = (y - 0.5) * -12;
      const tiltY = (x - 0.5) * 12;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY + (flipped ? 180 : 0),
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (shineRef.current) {
        gsap.set(shineRef.current, {
          opacity: 0.6,
          background: `radial-gradient(ellipse at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: (x - 0.5) * -20,
          y: 15 + (y - 0.5) * -10,
          opacity: 0.25,
          duration: 0.35,
          overwrite: 'auto',
        });
      }
    },
    [flipped, isTouch]
  );

  /* ── Mouse leave → reset (desktop only) ── */
  const onLeave = useCallback(() => {
    if (isTouch) return;
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: flipped ? 180 : 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
    if (shadowRef.current) gsap.to(shadowRef.current, { x: 0, y: 15, opacity: 0.12, duration: 0.5 });
    setFlipped(false);
  }, [flipped, isTouch]);

  const onEnterDesktop = useCallback(() => {
    if (!isTouch) setFlipped(true);
  }, [isTouch]);

  return (
    <div className="relative w-[min(280px,78vw)] md:w-[320px]">
      {/* Dynamic shadow — hidden on mobile for perf */}
      <div
        ref={shadowRef}
        className="absolute inset-x-[12%] bottom-[-6px] h-[50%] rounded-[50%] pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.18), transparent 70%)',
          filter: 'blur(16px)',
          opacity: 0.12,
          transform: 'translateY(15px)',
        }}
      />

      <div
        ref={wrapRef}
        className="relative cursor-pointer"
        style={{ perspective: '1000px' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnterDesktop}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          ref={cardRef}
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            minHeight: isTouch ? '340px' : '400px',
            willChange: 'transform',
          }}
        >
          {/* ─── Front Face ─── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            }}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={course.image}
                alt={course.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Light reflection overlay (desktop only) */}
              <div
                ref={shineRef}
                className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl hidden md:block"
                style={{ mixBlendMode: 'soft-light' }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                <span className="text-2xl md:text-3xl">{course.emoji}</span>
                <h3 className="font-display font-bold text-base md:text-lg mt-1.5 md:mt-2 leading-tight">
                  {course.name}
                </h3>
                <p className="text-white/50 text-[10px] md:text-[11px] mt-1 tracking-wide uppercase">
                  {isTouch ? 'Tap to flip →' : 'Hover to explore →'}
                </p>
              </div>
            </div>
          </div>

          {/* ─── Back Face ─── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center items-center p-5 md:p-6 text-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: `linear-gradient(145deg, white 0%, ${course.color}10 100%)`,
              boxShadow: `0 12px 40px ${course.color}15, 0 2px 10px rgba(0,0,0,0.06)`,
              border: `1.5px solid ${course.color}35`,
            }}
          >
            <span className="text-4xl md:text-5xl mb-2 md:mb-3">{course.emoji}</span>
            <h3
              className="font-display font-bold text-base md:text-lg mb-2"
              style={{ color: course.color }}
            >
              {course.name}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 max-w-[220px] md:max-w-[240px]">
              {course.tagline}
            </p>
            {'featured' in course && course.featured && (
              <span
                className="inline-block px-3 py-1 rounded-full text-white text-[10px] md:text-[11px] font-bold mb-3"
                style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}BB)` }}
              >
                ⭐ Featured Program
              </span>
            )}
            <a
              href="#contact"
              className="mt-1 inline-block px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-transform duration-200 active:scale-95 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${course.color}, ${course.color}CC)`,
                color: 'white',
                boxShadow: `0 4px 14px ${course.color}30`,
              }}
            >
              Enroll Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Vibrant 3D Marquee Card
   — Desktop: 270×300, 3D tilt + parallax, hover-reveal tagline
   — Mobile: 200×240, tagline always visible, no 3D tilt, tap-friendly
   ═══════════════════════════════════════════════════════════════ */

/* Helper: lighten a hex color for gradients */
function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}

function MarqueeCard({ course }: { course: (typeof COURSES)[number] }) {
  const isTouch = useIsTouchDevice();
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      const el = cardRef.current;
      if (!el) return;
      const { x, y } = getRelativeMouse(e, el);

      gsap.to(el, {
        rotateX: (y - 0.5) * -14,
        rotateY: (x - 0.5) * 14,
        scale: 1.07,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          x: (x - 0.5) * -12,
          y: (y - 0.5) * -12,
          scale: 1.12,
          duration: 0.3,
          overwrite: 'auto',
        });
      }
      if (infoRef.current) {
        gsap.to(infoRef.current, {
          x: (x - 0.5) * 8,
          y: (y - 0.5) * 8,
          duration: 0.3,
          overwrite: 'auto',
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          opacity: 0.7,
          background: `radial-gradient(ellipse at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.5) 0%, transparent 55%)`,
        });
      }
    },
    [isTouch]
  );

  const onEnter = useCallback(() => {
    if (isTouch) return;
    if (taglineRef.current) {
      gsap.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [isTouch]);

  const onLeave = useCallback(() => {
    if (isTouch) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.5, overwrite: 'auto' });
    }
    if (infoRef.current) {
      gsap.to(infoRef.current, { x: 0, y: 0, duration: 0.5, overwrite: 'auto' });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
    if (taglineRef.current) {
      gsap.to(taglineRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  }, [isTouch]);

  const lightBg = lightenColor(course.color, 80);

  return (
    <div
      className="flex-shrink-0"
      style={{ perspective: isTouch ? 'none' : '800px' }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={cardRef}
        className="relative rounded-[16px] md:rounded-[20px] overflow-hidden cursor-pointer w-[200px] h-[240px] md:w-[270px] md:h-[300px]"
        style={{
          transformStyle: isTouch ? 'flat' : 'preserve-3d',
          willChange: isTouch ? 'auto' : 'transform',
          boxShadow: `0 6px 20px ${course.color}20, 0 2px 6px rgba(0,0,0,0.06)`,
        }}
      >
        {/* Colorful gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${course.color} 0%, ${lightBg} 50%, ${course.color}90 100%)`,
          }}
        />

        {/* Background image with overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={imgRef} className="absolute inset-[-12px]">
            <Image
              src={course.image}
              alt={course.name}
              fill
              className="object-cover opacity-30"
              sizes="(max-width: 768px) 200px, 300px"
            />
          </div>
        </div>

        {/* Large centered emoji */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: isTouch ? '30px' : '20px' }}>
          <span
            className="text-5xl md:text-7xl drop-shadow-lg select-none"
            style={{ filter: `drop-shadow(0 4px 12px ${course.color}50)` }}
          >
            {course.emoji}
          </span>
        </div>

        {/* Cursor light overlay (desktop only) */}
        {!isTouch && (
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none opacity-0 rounded-[20px]"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}

        {/* Bottom glassmorphic info panel */}
        <div
          ref={infoRef}
          className="absolute bottom-0 left-0 right-0 p-3 md:p-4"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 70%, transparent 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <h4 className="font-display font-bold text-[13px] md:text-[15px] text-white leading-tight drop-shadow-md">
            {course.name}
          </h4>

          {/* On mobile: always visible. On desktop: hover-reveal */}
          <div
            ref={taglineRef}
            className="overflow-hidden"
            style={isTouch ? { opacity: 1, transform: 'none' } : { opacity: 0, transform: 'translateY(10px)' }}
          >
            <p className="text-white/80 text-[10px] md:text-xs leading-snug mt-1 md:mt-1.5">
              {course.tagline}
            </p>
            <a
              href="#contact"
              className="inline-block mt-1.5 md:mt-2 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-[11px] font-bold transition-transform active:scale-95 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.25)',
                color: 'white',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Learn More →
            </a>
          </div>
        </div>

        {/* Top-right colored badge */}
        <div
          className="absolute top-2 right-2 md:top-3 md:right-3 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold text-white shadow-md"
          style={{
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {course.emoji} Course
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Interactive Course Slider & Filters
   ═══════════════════════════════════════════════════════════════ */

const COURSE_CATEGORIES: Record<string, string> = {
  handwriting: 'creative',
  sensory: 'mind',
  art: 'creative',
  fitness: 'wellness',
  calligraphy: 'creative',
  yoga: 'wellness',
  music: 'creative',
  summer: 'creative',
  talent: 'mind',
  reflexology: 'wellness',
};

const CATEGORIES = [
  { id: 'all', name: '✨ All Programs', color: '#6B7280' },
  { id: 'mind', name: '🧠 Mind & Focus', color: '#AB47BC' },
  { id: 'creative', name: '🎨 Creative Arts', color: '#FF5252' },
  { id: 'wellness', name: '🧘 Fitness & Wellness', color: '#66BB6A' },
] as const;

function CourseSlider({ courses }: { courses: (typeof COURSES)[number][] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    const target = el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    gsap.to(el, {
      scrollLeft: target,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: updateScrollButtons,
    });
  };

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons();
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [courses]);

  useEffect(() => {
    const cards = trackRef.current?.children;
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [courses]);

  return (
    <div className="relative group/slider px-4 max-w-7xl mx-auto">
      {/* Prev Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/90 backdrop-blur border border-gray-100 shadow-md text-gray-800 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Previous programs"
        >
          ←
        </button>
      )}

      {/* Next Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/90 backdrop-blur border border-gray-100 shadow-md text-gray-800 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Next programs"
        >
          →
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide py-6 px-4 md:px-12 flex gap-6 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div ref={trackRef} className="flex gap-6 mx-auto">
          {courses.map((course) => (
            <div key={course.id} className="snap-start snap-always">
              <MarqueeCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════════════ */
export default function CourseFlipExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTouch = useIsTouchDevice();
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header fades up
      gsap.from('.courses-header', {
        scrollTrigger: { trigger: section, start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Featured cards fly in
      gsap.from('.flip-card-wrapper', {
        scrollTrigger: { trigger: '.flip-cards-row', start: 'top 82%' },
        y: 50,
        rotateX: -15,
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.3)',
      });

      // Category selector & Slider fade in
      gsap.from('.interactive-courses-section', {
        scrollTrigger: { trigger: '.interactive-courses-section', start: 'top 90%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredCourses = MARQUEE_COURSES.filter((course) => {
    if (activeTab === 'all') return true;
    return COURSE_CATEGORIES[course.id] === activeTab;
  });

  return (
    <section id="courses" ref={sectionRef} className="relative py-14 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8ff] via-white to-[#f0f9ff]" />
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-gold/10 rounded-full blur-[80px] md:blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-purple/10 rounded-full blur-[80px] md:blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky/5 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="courses-header text-center px-4 mb-8 md:mb-14">
          <span className="inline-block glass rounded-full px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-sky mb-2 md:mb-3">
            🚀 Our Programs
          </span>
          <h2 className="font-display text-xl md:text-4xl font-bold">
            Explore Our <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-gray-400 mt-1.5 md:mt-2 text-xs md:text-base max-w-md mx-auto">
            {isTouch
              ? 'Tap the featured cards to flip them'
              : 'Hover and interact with each card to learn more'}
          </p>
        </div>

        {/* ── Featured 3D Flip Cards ── */}
        <div
          className="flip-cards-row flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 md:gap-14 px-4 mb-10 md:mb-16"
          style={{ perspective: '1200px' }}
        >
          {FEATURED_COURSES.map((course) => (
            <div
              key={course.id}
              className="flip-card-wrapper"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <HoverFlipCard course={course} />
              <p className="text-center mt-2 md:mt-4 text-[10px] md:text-[11px] text-gray-400 font-medium tracking-widest uppercase">
                {course.id === 'abacus' ? '🏆 Signature Program' : '🔬 Scientific Counselling'}
              </p>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3 md:gap-4 px-6 md:px-20 mb-4 md:mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-gray-400 tracking-widest uppercase">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gold" />
            More Programs
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-purple" />
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* ── Filterable Carousel Section ── */}
        <div className="interactive-courses-section mt-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 px-4 max-w-4xl mx-auto">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white/60 hover:bg-white text-gray-600 border border-gray-100 shadow-sm'
                }`}
                style={
                  activeTab === tab.id
                    ? {
                        boxShadow: `0 4px 12px ${tab.color}25`,
                      }
                    : {}
                }
              >
                {tab.name}
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] md:text-xs text-gray-400 mb-4">
            {isTouch
              ? 'Swipe through or tap any card to explore'
              : 'Move cursor over cards for 3D tilt and details'}
          </p>

          {/* Cards Slider */}
          <CourseSlider courses={filteredCourses} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-14 px-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 md:gap-2.5 px-6 md:px-8 py-3 md:py-4 rounded-full text-gray-900 font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FFC107, #FFB300)',
              boxShadow: '0 6px 24px rgba(255,193,7,0.25)',
            }}
          >
            <span className="text-base md:text-lg">📞</span>
            Enquire About Any Course
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
