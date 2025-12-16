'use client';

import { CategoryBar } from '@/features/experience/ui/category-bar';
import { FilterBar, FilterState } from '@/features/experience/ui/filter-bar';
import { DiscoverCard } from '@/features/experience/ui/discover-card';
import { mockExperiences } from '@/features/experience/model/mock-data';
import { useState, useMemo } from 'react';
import { isWithinInterval, parseISO } from 'date-fns';

import CustomSheet from '@/widget/sheet';

const categories = [
  'All',
  'Food & Drink',
  'Tours',
  'Sports',
  'Culture',
  'Entertainment',
  'Nightlife',
  'Nature',
  'Art',
  'Beauty',
];

export default function DiscoverPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [filterState, setFilterState] = useState<FilterState>({
    guest: 0,
    price: [0, 60],
    language: ['All'],
    rating: [0, 6],
  });

  const filteredExperiences = useMemo(() => {
    return mockExperiences.filter((exp) => {
      if (!selectedCategories.includes('All') && !selectedCategories.includes(exp.category)) {
        return false;
      }

      if (filterState.guest > 0 && exp.maxGuests < filterState.guest) {
        return false;
      }

      const [minPrice, maxPrice] = filterState.price;
      if (exp.price < minPrice) return false;
      if (maxPrice < 60 && exp.price > maxPrice) return false;

      if (!filterState.language.includes('All')) {
        const hasMatchingLanguage = filterState.language.some((lang) =>
          exp.languages.includes(lang)
        );
        if (!hasMatchingLanguage) return false;
      }

      const [minRatingIndex, maxRatingIndex] = filterState.rating;
      const getRatingValue = (index: number) => {
        const ratings = [0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
        return ratings[index];
      };
      const minRating = getRatingValue(minRatingIndex);
      const maxRating = getRatingValue(maxRatingIndex);
      
      if (!(minRating === 0 && maxRating === 5.0)) {
         if (exp.rating < minRating || exp.rating > maxRating) return false;
      }
      if (filterState.date?.from) {
        const { from, to } = filterState.date;
        const hasDateInRange = exp.availableDates.some((dateStr) => {
          const date = parseISO(dateStr);
          if (to) {
            return isWithinInterval(date, { start: from, end: to });
          }
          return date.toDateString() === from.toDateString();
        });
        if (!hasDateInRange) return false;
      }

      return true;
    });
  }, [selectedCategories, filterState]);

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
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp) => (
              <DiscoverCard
                key={exp.id}
                image={exp.image}
                title={exp.title}
                price={exp.price}
                duration={exp.duration}
                location={exp.location}
                badgeText={exp.category}
              />
            ))
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
