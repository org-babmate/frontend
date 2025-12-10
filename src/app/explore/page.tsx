import Header from '@/shared/ui/header';
import FindMateSection from '@/widget/find-mate-section';

function ExplorePage() {
  return (
    <div className="relative w-full">
      <Header />
      <div className="pt-[52px]">
        <FindMateSection />
      </div>
    </div>
  );
}

export default ExplorePage;
