import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/entities/auth/model/api';
import type { CommonResponse } from '@/entities/auth/model/types';

export function useResetPassword(onSuccess?: (data: CommonResponse) => void) {
  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
  return resetMutation;
}
