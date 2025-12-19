'use client';

import ReviewInputSection from '@/widget/review-section';
import { useParams } from 'next/navigation';

function ExperienceReview() {
  const params = useParams();
  const id = params.id as string;
  return (
    <div className="w-full">
      <ReviewInputSection id={id} />
    </div>
  );
}

export default ExperienceReview;
