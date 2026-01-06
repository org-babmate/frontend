'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { ImageCarousel } from '@/shared/ui/carousel';

interface ExperienceHeaderProps {
  title: string;
  photos: string[];
}

export function ExperienceHeader({ title, photos }: ExperienceHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative w-full h-[367px]">
      {/* <button
        onClick={() => router.back()}
        className="absolute top-7.75 left-5 size-6 z-20 flex items-center justify-center p-0"
        aria-label="Go back"
      >
        <ChevronLeft className="w-full h-full text-white drop-shadow-md" strokeWidth={2.5} />
      </button> */}
      <ImageCarousel images={photos.length > 0 ? photos : ['', '']} height="367px" title={title} />
    </div>
  );
}
