import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';

interface Payload {
  email: string;
}

export function useFindPassword(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (payload: Payload) => apiClient.post('/auth/find-password', payload),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
