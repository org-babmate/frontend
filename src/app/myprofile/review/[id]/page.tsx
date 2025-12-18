'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { RatingStars } from '@/shared/ui/rating-stars';
import { MOCK_REVIEWS } from '@/entities/review/model/mocks';

export default function ReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const review = MOCK_REVIEWS.find((r) => r.id === id);

  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] relative">
      <header className="flex flex-row items-center py-4 h-[63px] bg-white sticky top-0 z-10">
        <button onClick={() => router.back()} className="mr-3">
          <ChevronLeft size={24} className="text-[#020202]" />
        </button>
        <h1 className="font-suit font-semibold text-[18px] leading-[140%] text-[#020202]">
          Review
        </h1>
      </header>

      <div className="flex flex-col pb-10">
        <div className="flex flex-row gap-4 mt-5">
          <div className="w-[73px] h-[73px] bg-[#EAEBEF] rounded-lg flex-shrink-0" />
          <div className="flex flex-col justify-start gap-2">
            <span className="font-suit font-semibold text-[16px] leading-[150%] text-[#020202]">
              {review.experienceName || 'Experience Name'}
            </span>
            <span className="font-suit font-normal text-[14px] leading-[160%] text-[#A0A0A0]">
              Host Name
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
              <div key={idx} className="w-[220px] h-[280px] bg-[#EAEBEF] rounded-lg flex-shrink-0" />
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
    </div>
  );
}
