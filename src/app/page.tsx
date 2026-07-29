'use client';

import { useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import SmoothScroll from '@/components/SmoothScroll';
import HeroWorld from '@/components/HeroWorld';
import AboutSection from '@/components/AboutSection';
import CourseFlipExperience from '@/components/CourseFlipExperience';
import ChildDevelopment from '@/components/ChildDevelopment';
import GalleryExperience from '@/components/GalleryExperience';
import ParentTrust from '@/components/ParentTrust';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <SmoothScroll>
        <ScrollProgress />
        <Navigation />
        <main className={loaded ? 'opacity-100' : 'opacity-0'}>
          <HeroWorld />
          <AboutSection />
          <CourseFlipExperience />
          <ChildDevelopment />
          <GalleryExperience />
          <ParentTrust />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}
