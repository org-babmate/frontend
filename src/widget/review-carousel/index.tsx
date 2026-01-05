'use client';

import { HomeRecentReviews } from '@/entities/home/model/type';
import { getDateInfo } from '@/shared/lib/utils';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function ReviewCarousel({ reviews }: { reviews: HomeRecentReviews[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 240; // w-60
  const GAP = 16; // gap-4
  const PITCH = CARD_WIDTH + GAP;

  const MAX_INDEX = Math.max(reviews.length - 1, 0);
  const clampIndex = (i: number) => Math.min(Math.max(i, 0), MAX_INDEX);

  // 버튼으로 이동 중이면 스크롤 이벤트로 index 흔들리지 않게 막기
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimerRef = useRef<number | null>(null);

  // 사용자 스크롤 종료 감지(스냅 끝나고 한 번만 index 업데이트)
  const scrollEndTimerRef = useRef<number | null>(null);

  const computeIndexFromScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return 0;
    return clampIndex(Math.round(el.scrollLeft / PITCH));
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.scrollTo({ left: index * PITCH, behavior: 'smooth' });
  };

  const clearAutoScrollTimer = () => {
    if (autoScrollTimerRef.current) {
      window.clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  };

  const handleScroll = () => {
    // 1) 버튼으로 이동 중이면 스크롤 중간값으로 index 업데이트하지 않음
    if (isAutoScrollingRef.current) return;

    // 2) 사용자가 스크롤하는 동안에는 업데이트를 미루고,
    //    멈췄을 때(스냅 정착 후) 한 번만 index 확정
    if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);

    scrollEndTimerRef.current = window.setTimeout(() => {
      const idx = computeIndexFromScroll();
      setCurrentIndex((prev) => (prev === idx ? prev : idx));
    }, 80);
  };

  const handleNext = () => {
    const next = clampIndex(currentIndex + 1);
    if (next === currentIndex) return;

    // 숫자를 즉시 고정
    setCurrentIndex(next);

    // 스크롤 애니메이션 동안 흔들림 방지
    isAutoScrollingRef.current = true;
    clearAutoScrollTimer();
    autoScrollTimerRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;

      // 혹시 스크롤이 덜 맞았으면 최종 한 번 동기화
      const idx = computeIndexFromScroll();
      setCurrentIndex((prev) => (prev === idx ? prev : idx));
    }, 350); // smooth duration 근사치

    scrollToIndex(next);
  };

  const handlePrev = () => {
    const prevIdx = clampIndex(currentIndex - 1);
    if (prevIdx === currentIndex) return;

    setCurrentIndex(prevIdx);

    isAutoScrollingRef.current = true;
    clearAutoScrollTimer();
    autoScrollTimerRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
      const idx = computeIndexFromScroll();
      setCurrentIndex((p) => (p === idx ? p : idx));
    }, 350);

    scrollToIndex(prevIdx);
  };

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      clearAutoScrollTimer();
    };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div className="py-5 w-full flex flex-col gap-3">
      <h1 className="text-heading-1 py-1">Recent Reviews</h1>

      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' as any }}
        >
          {reviews.map((value) => {
            const { day, monthEngLong, year } = getDateInfo(value.createdAt);
            return (
              <div
                key={value.id}
                className="w-60 shrink-0 flex flex-col snap-center relative gap-3 p-3 bg-white  rounded-xl"
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
                    <span className="text-label-1-semibold">{value.guestName}</span>
                    <span className="text-label-2-regular text-label-subtler">
                      {`${day} ${monthEngLong} ${year}`}
                    </span>
                  </div>
                  <span className="text-body-2-regular">{value.comment}</span>
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
          <ChevronLeft />
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
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ReviewCarousel;
