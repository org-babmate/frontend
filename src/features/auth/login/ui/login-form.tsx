'use client';

import { useRouter } from 'next/navigation';
import { useLoginForm } from '../model/use-login-form';
import { FormField } from '@/shared/ui/form';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useLoginForm(() => {
    router.push('/test');
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <h1 className="text-xl font-semibold">로그인</h1>

      <FormField label="이메일" error={errors.email?.message}>
        <input
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="bg-gray-200 rounded-sm px-3 py-1"
        />
      </FormField>

      <FormField label="비밀번호" error={errors.password?.message}>
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
          className="bg-gray-200 rounded-sm px-3 py-1"
        />
      </FormField>

      {error && <p className="text-xs text-red-500">이메일 또는 비밀번호가 올바르지 않습니다.</p>}
      <Link href="/auth/findPassword" className="text-purple-700">
        비밀번호 찾기
      </Link>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-gray-400 py-2 rounded-sm"
      >
        {isLoading ? '로그인 중…' : '로그인'}
      </button>
    </form>
  );
}
