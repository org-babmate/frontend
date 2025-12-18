import {
  deleteHostExperience,
  registerHostExperience,
  updateHostExperience,
} from '@/entities/experiences/model/host-api';
import { Experience, ExperienceResponse } from '@/entities/experiences/model/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useRegisterExperienceMutation(onSuccess?: (data: ExperienceResponse) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerHostExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostExperience', data.experienceDetail.id] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}
export function useUpdateExperienceMutation(onSuccess?: (data: Experience) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHostExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostExperience'] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}

export function useDeleteExperienceMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHostExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostExperience'] });
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}
