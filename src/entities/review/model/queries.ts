import { useQuery } from '@tanstack/react-query';
import { getReviews, getReview } from './api';
import { Review } from './types';

export const reviewKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: string) => [...reviewKeys.details(), id] as const,
};

export function useReviewList() {
  return useQuery({
    queryKey: reviewKeys.lists(),
    queryFn: getReviews,
  });
}

export function useReviewDetail(id: string) {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => getReview(id),
    enabled: !!id,
  });
}
