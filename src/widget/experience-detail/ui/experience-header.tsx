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
      <ImageCarousel images={photos.length > 0 ? photos : ['', '']} height="367px" title={title} />
    </div>
  );
}
