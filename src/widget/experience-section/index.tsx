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
    <div>
      <h1 className="text-headline-lg">Popular Categories</h1>
      <CategoryBar categories={categories} />
      <div className="flex flex-col">
        <ExperienceItem
          title={'Experience 1'}
          date={'2025-11-11'}
          time={'11:00~12:00'}
          image={''}
          description={'this is experience 1'}
          status={'Cancel'}
        />
        <hr />
        <ExperienceItem
          title={'Experience 1'}
          date={'2025-11-11'}
          time={'11:00~12:00'}
          image={''}
          description={'this is experience 1'}
          status={'Cancel'}
        />
        <div className="w-full flex justify-center">
          <Link href={'/experience'} className="underline underline-offset-2">
            See all experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
