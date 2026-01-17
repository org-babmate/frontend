import { useMutation } from '@tanstack/react-query';
import { emailResend } from '@/entities/auth/model/api';

interface Payload {
  email: string;
}

export function useEmailRevalidateMutation(onSuccess?: (data: string) => void) {
  return useMutation({
    mutationFn: emailResend,
    onSuccess: (data) => {
      onSuccess?.(data.message);
    },
  });
}
