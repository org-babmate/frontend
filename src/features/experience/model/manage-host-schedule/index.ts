import { deleteHostSchedule, registerHostSchedule } from '@/entities/experiences/model/host-api';
import { Experience, Schedules } from '@/entities/experiences/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRegisterScheduleMutation(onSuccess?: (data: Schedules) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerHostSchedule,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostSchedule'] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}

export function useDeleteScheduleMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHostSchedule,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostSchedule'] });
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}
