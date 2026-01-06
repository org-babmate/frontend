'use client';

import { useHomeFeedQuery } from '@/features/home/model/homefeed-queries';
import SearchMenu from '@/shared/ui/searchMenu';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import ReviewCarousel from '@/widget/review-carousel';
import Image from 'next/image';
function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  //WE need Skeleton
  if (!data || isLoading) {
    return <>...loading</>;
  }
  return (
    <div className="flex flex-col w-full pt-14 relative">
      <div className="relative w-screen aspect-9/5">
        <Image src="/banner.gif" alt="banner" fill objectFit="cover" priority />
      </div>
      <SearchMenu className="-mt-5 z-20 mx-4" />
      <div className="flex flex-col w-full justify-center px-4">
        <FindMateSection babmates={data.hosts} />
        <ExperienceSection experiences={data.experiences} categories={data.recentCategories} />
        <ReviewCarousel reviews={data.recentReviews} />
      </div>
    </div>
  );
}

export default HomeFeedSection;
