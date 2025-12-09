'use client';

import Header from '@/shared/ui/header';
import FindMateSection from '@/widget/find-mate-section';
import HeroSection from '@/widget/hero';

export default function Home() {
  return (
    <div className="relative w-full">
      <Header />
      <HeroSection />
      <FindMateSection />
    </div>
  );
}
