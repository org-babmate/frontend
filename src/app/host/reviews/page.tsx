'use client';

import { ReviewCard } from '@/entities/user/model/reviews/ui/review-card';
import { useReviewList } from '@/entities/user/model/reviews/model/queries';

export default function MyHostReviewPage() {
  const { data: reviews, isLoading, error } = useReviewList();

  if (isLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] relative">
        <div className="mb-6">
          <h1 className="font-suit font-semibold text-[22px] leading-[140%] text-[#020202]">
            My review
          </h1>
        </div>
        <div className="flex justify-center items-center h-60">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] relative">
        <div className=" mb-6">
          <h1 className="font-suit font-semibold text-[22px] leading-[140%] text-[#020202]">
            My review
          </h1>
        </div>
        <div className="flex justify-center items-center h-60">Error loading reviews</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] relative">
      <div className="mb-6">
        <h1 className="font-suit font-semibold text-[22px] leading-[140%] text-[#020202]">
          My review
        </h1>
      </div>

      <div className="flex flex-col gap-6 pb-20">
        {reviews?.map((review, index) => (
          <ReviewCard key={review.id} review={review} isLast={index === reviews.length - 1} />
        ))}
        {(!reviews || reviews.length === 0) && (
          <div className="flex justify-center items-center h-60">No reviews found</div>
        )}
      </div>
    </div>
  );
}
