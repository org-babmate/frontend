'use client';

import ReviewInputSection from '@/widget/review-section';
import { useParams, useSearchParams } from 'next/navigation';

function ExperienceReview() {
  const params = useParams();
  const reservationId = params.reservationId as string;
  const experienceId = params.experienceId as string;
  return (
    <div className="w-full">
      <ReviewInputSection reservationId={reservationId} experienceId={experienceId} />
    </div>
  );
}

export default ExperienceReview;
