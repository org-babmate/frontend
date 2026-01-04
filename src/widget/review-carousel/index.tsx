'use client';
import { HomeRecentReviews } from '@/entities/home/model/type';
import { getDateInfo } from '@/shared/lib/utils';
import { useRef, useState } from 'react';

function ReviewCarousel({ reviews }: { reviews: HomeRecentReviews[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(index);
    }
  };
  return (
    <div className="py-5 w-full">
      <h1 className="mb-4 text-headline-lg w-full">Reviews</h1>
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar  bg-gray-50 rounded-xl touch-pan-x"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' as any }}
        >
          {reviews.map((value, index) => {
            const { day, monthEngLong, year } = getDateInfo(value.createdAt);
            return (
              <div
                key={index}
                className="w-full  shrink-0 flex flex-col snap-center relative gap-3 p-4  pb-9.5"
              >
                <span className="text-title-md"> {value.comment}</span>
                <span className="text-caption-md text-gray-400">
                  {`${day} ${monthEngLong} ${year}`}
                </span>
                <span className="text-caption-md">{`by ${value.guestName}`}</span>
              </div>
            );
          })}
        </div>
        {/* {reviews.length > 1 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[6px] pointer-events-none"
            style={{ bottom: '28px' }}
          >
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`w-[6px] h-[6px] rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#020202]' : 'bg-white'
                }`}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ReviewCarousel;
