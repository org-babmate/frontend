'use client';

import { FilterBar } from '@/features/discover/ui/filter-bar';
import { ExperienceList } from '@/widget/experience-list/ui/experience-list';
import { useExperienceDiscover } from '@/features/discover/model/discover-queries';
import Header from '@/shared/ui/header';
import { Suspense } from 'react';

export default function DiscoverPage() {
  const { filterState, setFilterState, apiParams } = useExperienceDiscover();

  return (
    <Suspense fallback={null}>
      <div className="flex flex-col items-center  w-full">
        <Header />
        <div className="w-full border-b py-3 px-4 mt-13">
          <FilterBar filters={filterState} onFilterChange={setFilterState} />
        </div>
        <div className="flex flex-col items-center gap-4 w-full p-4">
          <ExperienceList searchParams={apiParams} />
        </div>
      </div>
    </Suspense>
  );
}
