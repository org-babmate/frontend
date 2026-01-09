import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ExperienceListParams } from '@/entities/experiences/model/types';
import { FilterState } from '../ui/filter-bar';
import { useCategoriesQuery } from '@/entities/experiences/model/queries';
import { useSearchParams } from 'next/navigation';

function parseYMD(s: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return undefined;
  return dt;
}

export function useExperienceDiscover() {
  const [filterState, setFilterState] = useState<FilterState>({
    guest: 0,
    price: [0, 60],
    language: [],
    rating: [0, 6],
    categories: ['all'],
  });

  const { data: categoriesData } = useCategoriesQuery();
  const categories = useMemo(() => {
    return ['All', ...(categoriesData || [])];
  }, [categoriesData]);

  const apiParams: ExperienceListParams = useMemo(() => {
    const params: ExperienceListParams = {};

    if (!filterState.categories.includes('all')) {
      params.categories = filterState.categories;
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

    if (filterState.language.length !== 0) {
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
  }, [filterState.categories, filterState]);

  return {
    filterState,
    setFilterState,
    apiParams,
  };
}
