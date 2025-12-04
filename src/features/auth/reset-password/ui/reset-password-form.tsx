'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/features/auth/login/model/validation';
import { useResetPassword } from '@/features/auth/reset-password/model/use-reset-password';

export function ResetPasswordForm() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  const {
    register,
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
    if (!accessToken) {
      //TODO: 에러처리
      return;
    }

    mutate({
      token: accessToken,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-black"
    >
      <h1 className="text-xl font-semibold">비밀번호 초기화</h1>

      <div className="flex flex-col gap-2">
        <input
          type="password"
          placeholder="새 비밀번호"
          className="bg-gray-200 rounded-sm px-3 py-1"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs text-red-500">
            {errors.password.message}
          </p>
        )}

        <input
          type="password"
          placeholder="새 비밀번호 확인"
          className="bg-gray-200 rounded-sm px-3 py-1"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <p className="text-xs text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500">비밀번호 변경 중 오류가 발생했습니다.</p>
      )}

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
