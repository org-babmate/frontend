import { CategoryBar } from '@/features/experience/ui/dashboard/category-bar';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import Link from 'next/link';

const categories = [
  'All',
  'Pop-up kitchen',
  'Eat like a local',
  'Cook together',
  'Delivery & chill',
  'Bite the streets',
  'Snack attack',
  'cafe hop & chat',
  'mystery table',
  'picnic in the park',
  'late-night eats',
  'soju nights',
  'mindful eats ',
];

function ExperienceSection() {
  return (
    <div className="pt-8 pb-5">
      <h1 className="text-headline-lg mb-7">Popular Categories</h1>
      <CategoryBar categories={categories} selected={['All']} />
      <div className="flex flex-col">
        <ExperienceItem title={'Experience 1'} dateTime={'2025-11-11'} image={''} />
        <hr />
        <ExperienceItem title={'Experience 1'} dateTime={'2025-11-11'} image={''} />
        <div className="py-5 w-full justify-center text-center text-body-lg">...</div>
        <div className="w-full flex justify-center">
          <Link
            href={'/discover'}
            className="underline underline-offset-2 text-button-md text-gray-600"
          >
            See all experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
