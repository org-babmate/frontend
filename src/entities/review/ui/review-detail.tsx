'use client';

import { RatingStars } from '@/shared/ui/rating-stars';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { Review } from '../model/types';

interface ReviewDetailProps {
  review: Review;
}

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <div className="flex flex-col pb-10">
      <div className="flex flex-row gap-4 mt-5">
        <ImageWithFallback
          src={review.experience.thumbnailUrl}
          alt={review.experience.title}
          className="w-[73px] h-[73px] bg-[#EAEBEF] rounded-lg flex-shrink-0 object-cover"
        />
        <div className="flex flex-col justify-start gap-2">
          <span className="font-suit font-semibold text-[16px] leading-[150%] text-[#020202]">
            {review.experience.title}
          </span>
          <span className="font-suit font-normal text-[14px] leading-[160%] text-[#A0A0A0]">
            {review.experience.hostName}
          </span>
        </div>
      </div>

      <div className="h-2 bg-[#F3F3F5] -mx-4 mt-5 mb-8" />

      <RatingStars
        rating={review.rating}
        size={33}
        gap={5.5}
        activeColor="#020202"
        inactiveColor="#EAEBEF"
      />

      {review.images && review.images.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar mt-8 -mx-4 px-4">
          {review.images.map((img, idx) => (
            <ImageWithFallback
              key={idx}
              src={img}
              alt={`review-image-${idx}`}
              className="w-[220px] h-[280px] bg-[#EAEBEF] rounded-lg flex-shrink-0 object-cover"
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 mt-8">
        <div className="flex flex-col p-3 gap-[10px] bg-[#F3F3F5] rounded-lg min-h-[156px]">
          <p className="font-suit font-normal text-[14px] leading-[160%] text-[#4B4B4B]">
            {review.comment}
          </p>
          <div className="flex justify-end mt-auto">
            <span className="font-suit font-normal text-[12px] leading-[150%] text-[#A0A0A0]">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
