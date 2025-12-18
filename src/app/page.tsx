'use client';

import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import Header from '@/shared/ui/header';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import HeroSection from '@/widget/hero';
import Link from 'next/link';

export default function Home() {
  const auth = useAuthStore((s) => s.accessToken);
  return (
    <div className="relative w-full">
      <Header withSignIn={!auth} />
      <HeroSection />
      <FindMateSection />
      <div className="py-5 w-full justify-center text-center text-body-lg">...</div>
      <div className="w-full flex justify-center">
        <Link
          href={'/explore'}
          className="underline underline-offset-2 text-button-md text-gray-600"
        >
          See all Babmates
        </Link>
      </div>
      <ExperienceSection />
    </div>
  );
}
