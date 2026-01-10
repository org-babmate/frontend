'use client';

import ReviewInputSection from '@/widget/review-input-section';
import { useParams } from 'next/navigation';

function ExperienceReview() {
  const params = useParams();

  const reservationIdRaw = params.reservationId;
  const experienceIdRaw = params.experienceId;

  const reservationId =
    typeof reservationIdRaw === 'string' ? reservationIdRaw : reservationIdRaw?.[0];

  const experienceId = typeof experienceIdRaw === 'string' ? experienceIdRaw : experienceIdRaw?.[0];

  const reservationIdTrimmed = (reservationId ?? '').trim();
  const experienceIdTrimmed = (experienceId ?? '').trim();

  return (
    <div className="w-full">
      <ReviewInputSection reservationId={reservationIdTrimmed} experienceId={experienceIdTrimmed} />
    </div>
  );
}

export default ExperienceReview;
