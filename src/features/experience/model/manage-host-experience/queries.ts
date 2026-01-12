import {
  deleteHostExperience,
  registerHostExperience,
  updateHostExperience,
} from '@/entities/experiences/model/host-api';
import { Experience, ExperienceResponse } from '@/entities/experiences/model/types';
import { getErrorMessage } from '@/shared/api/error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useRegisterExperienceMutation(onSuccess?: (data: ExperienceResponse) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerHostExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hostExperience', data.experienceDetail.id] });
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
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
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
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
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
