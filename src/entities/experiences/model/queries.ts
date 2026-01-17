import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCategories, getExperiences, getExperience } from './api';
import { ExperienceListParams, ExperienceResponse, ScheduleLists } from './types';

export const experienceKeys = {
  all: ['experiences'] as const,
  categories: () => [...experienceKeys.all, 'categories'] as const,
  list: (params: ExperienceListParams) => [...experienceKeys.all, 'list', params] as const,
  details: (id: string) => [...experienceKeys.all, 'details', id] as const,
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

export function useExperienceDetailQuery(id: string) {
  return useQuery<
    ExperienceResponse & {
      scheduleList: ScheduleLists[];
    }
  >({
    queryKey: experienceKeys.details(id),
    queryFn: () => getExperience(id),
    enabled: !!id,
  });
}
