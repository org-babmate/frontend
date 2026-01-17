'use client';

import Header from '@/shared/ui/header';
import ReviewListSection from '@/widget/review-list-section';

export default function MyReviewPage() {
  return (
    <>
      <div className="w-full pt-14">
        <Header />
      </div>
      <ReviewListSection />
    </>
  );
}
