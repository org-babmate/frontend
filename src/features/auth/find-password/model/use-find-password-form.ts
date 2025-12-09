import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { EmailFormValues, emailSchema } from '@/features/auth/login/model/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Payload {
  email: string;
}

export function useFindPasswordForm(onSuccess?: () => void) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: Payload) => apiClient.post('/auth/forgot-password', payload),
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
