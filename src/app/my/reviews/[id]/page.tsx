'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useReviewDetail } from '@/entities/user/model/reviews/model/queries';
import { ReviewDetail } from '@/entities/user/model/reviews/ui/review-detail';

export default function ReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: review, isLoading, error } = useReviewDetail(id);

  if (isLoading) {
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
        <div className="flex justify-center items-center h-60">Loading...</div>
      </div>
    );
  }

  if (error || !review) {
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
        <div className="flex justify-center items-center h-60">Waiting for reviews!</div>
      </div>
    );
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

      <ReviewDetail review={review} />
    </div>
  );
}
