'use client';

import { useHomeFeedQuery } from '@/features/home/model/homefeed-queries';
import SearchMenu from '@/shared/ui/searchMenu';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import ReviewCarousel from '@/widget/review-carousel';

function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  //WE need Skeleton
  if (!data || isLoading) {
    return <>...loading</>;
  }
  return (
    <div className="flex flex-col w-full justify-center containerLayout">
      <SearchMenu />
      <FindMateSection babmates={data.hosts} />
      <ExperienceSection experiences={data.experiences} categories={data.recentCategories} />
      <ReviewCarousel reviews={data.recentReviews} />
    </div>
  );
}

export default HomeFeedSection;
