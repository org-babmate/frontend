'use client';

import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Review } from '../model/types';

interface ReviewCardProps {
  review: Review;
  isLast: boolean;
}

export function ReviewCard({ review, isLast }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center w-full relative">
        <Link href={`/myprofile/review/${review.id}`} className="flex flex-row items-center gap-1">
          <span className="font-suit font-semibold text-base leading-[150%] text-[#020202]">
            {review.experienceName}
          </span>
          <ChevronRight size={16} className="text-[#020202]" />
        </Link>
      </div>

      <div className="flex flex-col gap-[7px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[2px]">
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="half-fill" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#4B4B4B" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFull = star <= Math.floor(review.rating);
              const isHalf = star === Math.ceil(review.rating) && review.rating % 1 !== 0;
              
              return (
                <Star
                  key={star}
                  size={12}
                  fill={isFull ? '#4B4B4B' : isHalf ? 'url(#half-fill)' : 'none'}
                  stroke="#4B4B4B"
                  className="text-[#4B4B4B]"
                />
              );
            })}
          </div>
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
            <div key={idx} className="w-[108px] h-[108px] bg-[#EAEBEF] rounded-lg flex-shrink-0" />
          ))}
        </div>
      )}

      {!isLast && <div className="w-full h-[1px] bg-[#EAEBEF]" />}
    </div>
  );
}
