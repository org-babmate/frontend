'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

import { useResetPassword } from '@/features/auth/reset-password/model/use-reset-password';
import { Input } from '@/shared/ui/input';
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from '@/features/auth/reset-password/model/validation';

export function ResetPasswordForm() {
  const router = useRouter();
  const authed = useAuthStore((s) => s.authed);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const { mutate, error, isPending } = useResetPassword(() => {
    router.push('/login');
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    if (!authed) {
      return;
    }
    mutate({
      token: '',
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              label="New password"
              type="password"
              placeHolder="password"
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
              error={errors.password?.message}
              name={'New password'}
            />
          )}
        />

        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field }) => (
            <Input
              label="Confirm Password"
              type="password"
              placeHolder="confirm password"
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
              error={errors.passwordConfirm?.message}
              name={'Confirm Password'}
            />
          )}
        />
      </div>

      {error && <p className="text-xs text-red-500">비밀번호 변경 중 오류가 발생했습니다.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-2 bg-gray-400 py-2 rounded-sm disabled:opacity-60"
      >
        {isPending ? '리셋 중…' : '리셋'}
      </button>
    </form>
  );
}
