'use client';

import React from 'react';
import Header from '@/shared/ui/header';
import { ReviewCard } from '@/entities/review/ui/review-card';
import { MOCK_REVIEWS } from '@/entities/review/model/mocks';

export default function MyReviewPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] relative">
      <Header withSignIn={false} />
      <div className="mt-[72px] mb-6">
        <h1 className="font-suit font-semibold text-[22px] leading-[140%] text-[#020202]">
          My review
        </h1>
      </div>

      <div className="flex flex-col gap-6 pb-20">
        {MOCK_REVIEWS.map((review, index) => (
          <ReviewCard key={review.id} review={review} isLast={index === MOCK_REVIEWS.length - 1} />
        ))}
      </div>
    </div>
  );
}

