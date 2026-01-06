'use client';

import { FilterBar } from '@/features/discover/ui/filter-bar';
import { CategoryBar } from '@/features/discover/ui/category-bar';
import { ExperienceList } from '@/widget/experience-list/ui/experience-list';
import { useExperienceDiscover } from '@/features/discover/model/discover-queries';
import Header from '@/shared/ui/header';

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
    <div className="flex flex-col items-center  min-h-screen w-full">
      <Header />
      <div className="w-full max-w-360 py-6 flex flex-col gap-6 mt-13">
        <header className="flex flex-col gap-4">
          {/* <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
            <CustomSheet />
          </div> */}
          {/* <CategoryBar
            categories={categories}
            selected={selectedCategories}
            onSelect={setSelectedCategories}
          /> */}
          <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
          <FilterBar filters={filterState} onFilterChange={setFilterState} />
        </header>

        <div className="flex flex-col items-center gap-4 w-full">
          <ExperienceList searchParams={apiParams} />
        </div>
      </div>
    </div>
  );
}
