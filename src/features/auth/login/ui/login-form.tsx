'use client';

import { useRouter } from 'next/navigation';
import { useLoginForm } from '../model/use-login-form';
import { FormField } from '@/shared/ui/form';

export function LoginForm({ redirect }: { redirect: string }) {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useLoginForm(async () => {
    router.push(redirect);
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <FormField label="E-mail" error={errors.email?.message}>
        <input
          type="email"
          placeholder="E-mail address"
          {...register('email')}
          className="bg-gray-200 rounded-sm px-3 py-1"
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className="bg-gray-200 rounded-sm px-3 py-1"
        />
      </FormField>

      {error && <p className="text-xs text-red-500">이메일 또는 비밀번호가 올바르지 않습니다.</p>}
      {/* <Link
        href="/auth/findPassword"
        className="text-gray-600 text-sm underline underline-offset-2"
      >
        Forgot password
      </Link> */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-black text-white py-2 rounded-sm"
      >
        {isLoading ? 'pending...' : 'Log in'}
      </button>
    </form>
  );
}
