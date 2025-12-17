'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  height: string; 
  title?: string;
}

export function ImageCarousel({ images, height, title = 'Image' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(index);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div 
        className="w-full bg-[#EAEBEF] flex items-center justify-center text-gray-400"
        style={{ height }}
      >
        No Image
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((src, index) => (
          <div 
            key={index} 
            className="w-full min-w-full h-full flex-shrink-0 snap-center relative"
          >
            <Image
              src={src}
              alt={`${title} - ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              onError={(e) => console.error("이미지 로드 실패:", src)}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div 
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[6px]"
            style={{ bottom: '28px' }} 
        >
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-[6px] h-[6px] rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#020202]' : 'bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
