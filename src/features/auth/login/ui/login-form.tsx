'use client';

import { useRouter } from 'next/navigation';
import { useLoginForm } from '../model/use-login-form';
import { FormField } from '@/shared/ui/form';
import Link from 'next/link';

export function LoginForm({ redirect }: { redirect: string }) {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useLoginForm(async () => {
    router.replace(redirect);
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-black w-full">
      <FormField label="E-mail" error={errors.email?.message}>
        <input
          type="email"
          placeholder="E-mail address"
          {...register('email')}
          className="px-4 py-3 bg-white ring ring-gray-200 rounded-4 ty-body-1-regular"
        />
      </FormField>
      <div className="flex flex-col gap-3">
        <FormField label="Password" error={errors.password?.message}>
          <input
            type="password"
            placeholder="password"
            {...register('password')}
            className="px-4 py-3 bg-white ring ring-gray-200 rounded-4 ty-body-1-regular"
          />
        </FormField>
        {error && (
          <p className="ty-caption-md text-label-red">이메일 또는 비밀번호가 올바르지 않습니다.</p>
        )}
        <Link
          href="/auth/findPassword"
          className="text-label-blue ty-label-1-semibold underline underline-offset-2"
        >
          Forgot password
        </Link>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={'py-3 mt-3  text-white rounded-2 w-full bg-primary-normal'}
      >
        {isLoading ? 'pending...' : 'Continue'}
      </button>
    </form>
  );
}
