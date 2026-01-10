'use client';

import Header from '@/shared/ui/header';
import ReviewListSection from '@/widget/review-list-section';

export default function MyReviewPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full px-4 pt-14">
        <Header />
      </div>
      <ReviewListSection />
    </div>
  );
}
