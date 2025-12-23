'use client';

import { FilterBar } from '@/features/discover/ui/filter-bar';
import CustomSheet from '@/widget/sheet';
import { CategoryBar } from '@/features/discover/ui/category-bar';
import { useExperienceDiscover } from '@/features/discover/model/use-experience-discover';
import { ExperienceList } from '@/widget/experience-list/ui/experience-list';

export default function DiscoverPage() {
  const {
    categories,
    selectedCategories,
    setSelectedCategories,
    filterState,
    setFilterState,
    apiParams,
  } = useExperienceDiscover();

  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full">
      <div className="w-full max-w-[1440px] py-6 flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          {/* <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
            <CustomSheet />
          </div> */}
          <CategoryBar
            categories={categories}
            selected={selectedCategories}
            onSelect={setSelectedCategories}
          />
          <FilterBar filters={filterState} onFilterChange={setFilterState} />
        </header>
        <div className="flex flex-col items-center gap-4 w-full">
          <ExperienceList searchParams={apiParams} />
        </div>
      </div>
    </div>
  );
}
