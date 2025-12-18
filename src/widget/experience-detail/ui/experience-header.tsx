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
    <div className="relative w-[calc(100%+32px)] -mx-4 h-[367px] bg-[#EAEBEF]">
      <button
        onClick={() => router.back()}
        className="absolute top-[31px] left-[20px] w-[24px] h-[24px] z-20 flex items-center justify-center p-0"
        aria-label="Go back"
      >
        <ChevronLeft className="w-full h-full text-white drop-shadow-md" strokeWidth={2.5} />
      </button>

      <ImageCarousel
        images={photos.length > 0 ? photos : ['/a.jpg', '/a.jpg', '/a.jpg', '/a.jpg']}
        height="367px"
        title={title}
      />
    </div>
  );
}
