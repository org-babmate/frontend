'use client';

import { CategoryBar } from '@/features/experience/ui/category-bar';
import { FilterBar, FilterState } from '@/features/experience/ui/filter-bar';
import { DiscoverCard } from '@/features/experience/ui/discover-card';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import CustomSheet from '@/widget/sheet';
import { useCategoriesQuery, useExperiencesInfiniteQuery } from '@/entities/experiences/model/queries';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer';
import { ExperienceListParams } from '@/entities/experiences/model/types';

export default function DiscoverPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [filterState, setFilterState] = useState<FilterState>({
    guest: 0,
    price: [0, 60],
    language: ['All'],
    rating: [0, 6],
  });

  const { data: categoriesData } = useCategoriesQuery();
  const categories = useMemo(() => {
    return ['All', ...(categoriesData || [])];
  }, [categoriesData]);

  const apiParams: ExperienceListParams = useMemo(() => {
    const params: ExperienceListParams = {};

    if (!selectedCategories.includes('All')) {
      params.categories = selectedCategories;
    }

    if (filterState.guest > 0) {
      params.guestCount = filterState.guest;
    }

    const [minPrice, maxPrice] = filterState.price;
    if (minPrice > 0 || maxPrice < 60) {
      params.priceMin = minPrice;
      if (maxPrice < 60) {
        params.priceMax = maxPrice;
      }
    }

    if (!filterState.language.includes('All')) {
      params.languages = filterState.language.join(',');
    }

    const [minRatingIndex] = filterState.rating;
    const getRatingValue = (index: number) => {
      const ratings = [0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
      return ratings[index];
    };
    const minRating = getRatingValue(minRatingIndex);
    if (minRating > 0) {
      params.minRating = minRating;
    }

    if (filterState.date?.from) {
      params.dateFrom = format(filterState.date.from, 'yyyy-MM-dd');
      if (filterState.date.to) {
        params.dateTo = format(filterState.date.to, 'yyyy-MM-dd');
      }
    }

    return params;
  }, [selectedCategories, filterState]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useExperiencesInfiniteQuery(apiParams);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const experiences = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full">
      <div className="w-full max-w-[1440px] py-6 flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
            <CustomSheet />
          </div>
          <CategoryBar 
            categories={categories} 
            selected={selectedCategories}
            onSelect={setSelectedCategories}
          />
          <FilterBar 
            filters={filterState}
            onFilterChange={setFilterState}
          />
        </header>

        <div className="flex flex-col items-center gap-4 w-full">
          {isLoading ? (
            <div className="py-10 text-center text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="py-10 text-center text-red-500">Failed to load experiences.</div>
          ) : experiences.length > 0 ? (
            <>
              {experiences.map((exp) => (
                <DiscoverCard
                  key={exp.id}
                  image={exp.photos[0] || ''}
                  title={exp.title}
                  price={exp.price}
                  duration={`${exp.durationHours} hours`}
                  location={exp.meetingPlace}
                  badgeText={exp.category}
                />
              ))}
              <div ref={loadMoreRef} className="h-4 w-full" />
              {isFetchingNextPage && (
                <div className="py-4 text-center text-gray-400">Loading more...</div>
              )}
            </>
          ) : (
            <div className="py-10 text-center text-gray-500">
              No experiences found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
