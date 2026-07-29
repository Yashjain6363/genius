'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { HAND_REVEAL_PHOTOS } from '@/lib/constants';

type Props = {
  active: boolean;
};

export default function HandRevealPhotos({ active }: Props) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const left = leftRef.current;
    const right = rightRef.current;
    const glow = glowRef.current;
    if (!left || !right) return;

    const tl = gsap.timeline({ delay: 2.8 });

    // Magic glow at character's hands
    if (glow) {
      tl.fromTo(
        glow,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0
      );
      tl.to(glow, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.in' }, 0.2);
    }

    // Left photo — bottle-flip arc from left hand
    tl.fromTo(
      left,
      {
        x: 0,
        y: 0,
        z: -200,
        rotateX: 90,
        rotateY: -20,
        rotateZ: -15,
        scale: 0.15,
        opacity: 0,
      },
      {
        x: -140,
        y: -180,
        z: 80,
        rotateX: 720,
        rotateY: -8,
        rotateZ: -12,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
      },
      0.1
    );

    // Right photo — mirrored flip from right hand
    tl.fromTo(
      right,
      {
        x: 0,
        y: 0,
        z: -200,
        rotateX: 90,
        rotateY: 20,
        rotateZ: 15,
        scale: 0.15,
        opacity: 0,
      },
      {
        x: 140,
        y: -200,
        z: 100,
        rotateX: 720,
        rotateY: 8,
        rotateZ: 10,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
      },
      0.25
    );

    // Gentle float after landing
    tl.to([left, right], {
      y: '+=14',
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, [active]);

  const left = HAND_REVEAL_PHOTOS.find((p) => p.side === 'left')!;
  const right = HAND_REVEAL_PHOTOS.find((p) => p.side === 'right')!;

  if (!active) return null;

  return (
    <>
      {/* Desktop — 3D flip from character's hands */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none hidden md:block"
        style={{ perspective: '1200px' }}
      >
      {/* Hand origin glow — centered on character (~58% from top) */}
      <div
        ref={glowRef}
        className="absolute left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0"
        style={{
          top: '52%',
          background: 'radial-gradient(circle, rgba(255,213,79,0.7) 0%, rgba(171,71,188,0.3) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Left hand origin */}
      <div
        ref={leftRef}
        className="absolute preserve-3d opacity-0 will-change-transform"
        style={{
          top: '54%',
          left: '46%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="polaroid w-[130px] lg:w-[150px] shadow-2xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src={left.src} alt={left.title} fill className="object-cover" sizes="150px" />
          </div>
          <p className="polaroid-caption text-[10px]">{left.title}</p>
        </div>
      </div>

      {/* Right hand origin */}
      <div
        ref={rightRef}
        className="absolute preserve-3d opacity-0 will-change-transform"
        style={{
          top: '54%',
          left: '54%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="polaroid w-[130px] lg:w-[150px] shadow-2xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src={right.src} alt={right.title} fill className="object-cover" sizes="150px" />
          </div>
          <p className="polaroid-caption text-[10px]">{right.title}</p>
        </div>
      </div>
      </div>

      {/* Mobile — photos rise from bottom center */}
      <div className="absolute bottom-32 left-0 right-0 z-[6] flex justify-center gap-3 px-4 md:hidden pointer-events-none">
        {[left, right].map((photo, i) => (
          <div
            key={photo.side}
            className="polaroid w-[100px] shadow-xl animate-[handRevealMobile_1.2s_ease-out_forwards] opacity-0"
            style={{ animationDelay: `${3 + i * 0.2}s` }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src={photo.src} alt={photo.title} fill className="object-cover" sizes="100px" />
            </div>
            <p className="polaroid-caption text-[8px]">{photo.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
