'use client';

import Header from '@/shared/ui/header';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import HeroSection from '@/widget/hero';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-full">
      <Header />
      <HeroSection />
      <FindMateSection />
      <div className="w-full flex justify-center">
        <Link href={'/explore'} className="underline underline-offset-2">
          See all Babmates
        </Link>
      </div>
      <ExperienceSection />
    </div>
  );
}
