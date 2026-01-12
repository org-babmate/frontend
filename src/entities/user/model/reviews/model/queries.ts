import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getReviews, getReview, createReview } from './api';
import { Review } from './types';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/api/error';

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

export function useCreateReview(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['booking', 'bookingList'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
