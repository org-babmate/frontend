import { CategoryBar } from '@/features/experience/ui/category-bar';
import Header from '@/shared/ui/header';
import FindMateSection from '@/widget/find-mate-section';

function ExplorePage() {
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

  return (
    <div className="relative w-full">
      <Header />
      <CategoryBar categories={categories} />
      <div className="pt-[52px]">
        <FindMateSection />
      </div>
    </div>
  );
}

export default ExplorePage;
