import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCategories, getExperiences } from './api';
import { ExperienceListParams } from './types';

export const experienceKeys = {
  all: ['experiences'] as const,
  categories: () => [...experienceKeys.all, 'categories'] as const,
  list: (params: ExperienceListParams) => [...experienceKeys.all, 'list', params] as const,
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: experienceKeys.categories(),
    queryFn: getCategories,
  });
}

export function useExperiencesInfiniteQuery(params: ExperienceListParams) {
  return useInfiniteQuery({
    queryKey: experienceKeys.list(params),
    queryFn: ({ pageParam }) =>
      getExperiences({
        ...params,
        cursor: pageParam,
        limit: 10,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.nextCursor;
    },
  });
}
