'use client';

import ReviewInputSection from '@/widget/review-section';

interface PageProps {
  params: {
    reservationId: string;
    experienceId: string;
  };
}

function ExperienceReview({ params }: PageProps) {
  const { reservationId, experienceId } = params;
  return (
    <div className="w-full">
      <ReviewInputSection reservationId={reservationId} experienceId={experienceId} />
    </div>
  );
}

export default ExperienceReview;
