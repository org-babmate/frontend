'use client';

import { HomeRecentReviews } from '@/entities/home/model/type';
import { getDateInfo } from '@/shared/lib/utils';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

function ReviewCarousel({ reviews }: { reviews: HomeRecentReviews[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const MAX_INDEX = Math.max(reviews.length - 1, 0);
  const clampIndex = (i: number) => Math.min(Math.max(i, 0), MAX_INDEX);

  const isAutoScrollingRef = useRef(false);
  const autoScrollTimerRef = useRef<number | null>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // 세로 스와이프(부모 Y 스크롤) 의도면 캐러셀을 잠깐 비활성화해서
  // 부모 스크롤이 제스처를 가져가도록 처리
  const [passToParent, setPassToParent] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    setPassToParent(false);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const t = e.touches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    const threshold = 6; // 손떨림/미세 이동 무시

    // 세로 의도가 더 강하면(그리고 임계값 이상이면) 부모에 넘김
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
      setPassToParent(true);
    }
  };

  const onTouchEnd = () => {
    touchStartRef.current = null;
    setPassToParent(false);
  };

  const computeIndexFromScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return 0;

    const containerRect = el.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((node, idx) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const cardCenterX = r.left + r.width / 2;
      const dist = Math.abs(cardCenterX - containerCenterX);

      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    return clampIndex(bestIdx);
  };

  const clearAutoScrollTimer = () => {
    if (autoScrollTimerRef.current) {
      window.clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    const node = itemRefs.current[index];
    if (!el || !node) return;

    const elRect = el.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    const elCenter = elRect.left + elRect.width / 2;
    const nodeCenter = nodeRect.left + nodeRect.width / 2;
    const delta = nodeCenter - elCenter;

    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;

    if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);

    // 스크롤이 멈춘 뒤(80ms) 현재 center에 가까운 카드 인덱스 산출
    scrollEndTimerRef.current = window.setTimeout(() => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const idx = computeIndexFromScroll();
        setCurrentIndex((prev) => (prev === idx ? prev : idx));
      });
    }, 80);
  };

  const handleNext = () => {
    const next = clampIndex(currentIndex + 1);
    if (next === currentIndex) return;

    setCurrentIndex(next);

    isAutoScrollingRef.current = true;
    clearAutoScrollTimer();
    autoScrollTimerRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearAutoScrollTimer();
    };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div className="py-4 w-full flex flex-col">
      <h1 className="ty-heading-1 py-1 px-4">Recent Reviews</h1>

      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className="w-full flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar touch-pan-x py-3 px-4"
          style={{
            WebkitOverflowScrolling: 'touch' as any,
            // 세로 스와이프 의도일 때는 캐러셀을 잠깐 비활성화해서
            // 부모 스크롤이 제스처를 가져가게 함
            pointerEvents: passToParent ? 'none' : 'auto',
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
