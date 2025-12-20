'use client';

import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../image-with-fallback';

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
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' as any }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full min-w-full h-full shrink-0 snap-center relative">
            <ImageWithFallback
              src={src}
              alt={`${title} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[6px]  pointer-events-none"
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
