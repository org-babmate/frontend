import { useHomeFeedQuery } from '@/features/home/model/use-homefeed';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import HeroSection from '@/widget/hero';
import ReviewCarousel from '@/widget/review-carousel';
import Link from 'next/link';

function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  if (!data || isLoading) {
    return <>...loading</>;
  }
  return (
    <>
      <HeroSection />
      <FindMateSection babmates={data.hosts} />
      <div className="py-5 w-full justify-center text-center text-body-lg">...</div>
      <div className="w-full flex justify-center">
        {/* TODO: LINK TO ALL BABMATE */}
        <Link href={'/'} className="underline underline-offset-2 text-button-md text-gray-600">
          See all Babmates
        </Link>
      </div>
      <ExperienceSection experiences={data.experiences} />
      <ReviewCarousel reviews={data.recentReviews} />
    </>
  );
}

export default HomeFeedSection;
