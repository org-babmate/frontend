'use client';

import { HomeRecentReviews } from '@/entities/home/model/type';
import { getDateInfo } from '@/shared/lib/utils';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function ReviewCarousel({ reviews }: { reviews: HomeRecentReviews[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const MAX_INDEX = Math.max(reviews.length - 1, 0);
  const clamp = (i: number) => Math.min(Math.max(i, 0), MAX_INDEX);

  const scrollEndTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const cleanupTimers = () => {
    if (scrollEndTimerRef.current) {
      window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const computeCenteredIndex = () => {
    const el = containerRef.current;
    if (!el) return 0;

    const containerRect = el.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < itemRefs.current.length; i += 1) {
      const node = itemRefs.current[i];
      if (!node) continue;

      const r = node.getBoundingClientRect();
      const cardCenterX = r.left + r.width / 2;
      const dist = Math.abs(cardCenterX - centerX);

      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    return clamp(bestIdx);
  };

  const finalizeIndex = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const idx = computeCenteredIndex();
      setCurrentIndex((prev) => (prev === idx ? prev : idx));
    });
  };

  const onScroll = () => {
    // 스크롤중 방지
    if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);

    scrollEndTimerRef.current = window.setTimeout(() => {
      finalizeIndex();
    }, 80);
  };

  const scrollToIndex = (idx: number) => {
    const node = itemRefs.current[idx];
    if (!node) return;

    node.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const handleNext = () => {
    const next = clamp(currentIndex + 1);
    if (next === currentIndex) return;

    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const handlePrev = () => {
    const prev = clamp(currentIndex - 1);
    if (prev === currentIndex) return;

    setCurrentIndex(prev);
    scrollToIndex(prev);
  };

  useEffect(() => {
    return () => cleanupTimers();
  }, []);

  useEffect(() => {
    setCurrentIndex((i) => clamp(i));
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <div className="py-4 w-full flex flex-col">
      <h1 className="ty-heading-1 py-1 px-4">Recent Reviews</h1>

      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="w-full flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar py-3 px-4"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'auto',
          }}
        >
          {reviews.map((value, idx) => {
            const { day, monthEngLong, year } = getDateInfo(value.createdAt);

            return (
              <div
                key={value.id}
                ref={(node) => {
                  itemRefs.current[idx] = node;
                }}
                className="w-60 shrink-0 flex flex-col snap-center relative gap-3 p-3 bg-white rounded-xl ring ring-gray-200"
              >
                <ImageWithFallback
                  src={value.image}
                  alt="review-image"
                  width={217}
                  height={217}
                  className="rounded-lg object-cover"
                />

                <div className="flex flex-col gap-2 px-1 py-3">
                  <div className="flex justify-between">
                    <span className="ty-label-1-semibold">{value.guestName}</span>
                    <span className="ty-label-2-regular text-label-subtler">
                      {`${day} ${monthEngLong} ${year}`}
                    </span>
                  </div>

                  <span className="ty-body-2-regular">{value.comment}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full justify-center flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="size-8 ring ring-gray-200 flex justify-center items-center rounded-full disabled:opacity-30"
          aria-label="Previous review"
        >
          <ChevronLeft className="text-gray-700" />
        </button>

        <div
          className="text-body-2-medium text-label-subtler text-center"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {currentIndex + 1}/{MAX_INDEX + 1}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === MAX_INDEX}
          className="size-8 ring ring-gray-200 flex justify-center items-center rounded-full disabled:opacity-30"
          aria-label="Next review"
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default ReviewCarousel;
