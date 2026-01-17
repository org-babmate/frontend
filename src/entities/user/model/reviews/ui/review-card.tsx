'use client';

import { ChevronRight } from 'lucide-react';
import { RatingStars } from '@/shared/ui/rating-stars';
import Link from 'next/link';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { Review } from '../model/types';

interface ReviewCardProps {
  review: Review;
  isLast: boolean;
}

export function ReviewCard({ review, isLast }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center w-full relative">
        {/* TODO: 리뷰상세페이지 디자인 확정 이후 제거 */}
        <span className="font-suit font-semibold text-base leading-[150%] text-[#020202]">
          {review.experience.title}
        </span>
        {/* TODO: 리뷰상세페이지 디자인 확정 이후 다시 활성화 */}
        {/* <Link href={`/my/reviews/${review.id}`} className="flex flex-row items-center gap-1">
          <span className="font-suit font-semibold text-base leading-[150%] text-[#020202]">
            {review.experience.title}
          </span>
          <ChevronRight size={16} className="text-[#020202]" />
        </Link> */}
      </div>

      <div className="flex flex-col gap-[7px]">
        <div className="flex flex-row justify-between items-center">
          <RatingStars rating={review.rating} size={12} gap={2} activeColor="#4B4B4B" />
        </div>

        <span className="font-suit font-normal text-xs text-[#A0A0A0]">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="font-suit font-normal text-sm leading-[160%] text-[#020202]">
        {review.comment}
      </p>

      {review.images && review.images.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar">
          {review.images.map((img, idx) => (
            <ImageWithFallback
              width={120}
              height={120}
              key={idx}
              src={img}
              alt={`review-image-${idx}`}
              className="w-27 h-27 bg-[#EAEBEF] rounded-lg shrink-0 object-cover"
            />
          ))}
        </div>
      )}

      {!isLast && <div className="w-full h-px bg-[#EAEBEF]" />}
    </div>
  );
}
