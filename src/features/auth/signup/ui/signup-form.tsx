'use client';

import { useRouter } from 'next/navigation';
import { useSignupForm } from '../model/use-signup-form';
import { FormField } from '@/shared/ui/form';

export function SignupForm() {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useSignupForm(() => {
    router.push('/login');
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <h1 className="text-xl font-semibold">회원가입</h1>

      <FormField label="이메일" error={errors.email?.message}>
        <input type="email" placeholder="you@example.com" {...register('email')} />
      </FormField>

      <FormField label="이름 (닉네임)" error={errors.name?.message}>
        <input placeholder="Robin" {...register('name')} />
      </FormField>

      <FormField label="비밀번호" error={errors.password?.message}>
        <input  type="password" placeholder="비밀번호" {...register('password')} />
      </FormField>

      <FormField
        label="비밀번호 확인"
        error={errors.passwordConfirm?.message}
      >
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register('passwordConfirm')}
        />
      </FormField>

      {error && (
        <p className="text-xs text-red-500">
          이미 사용 중인 이메일이거나, 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button type="submit" disabled={isLoading} className="w-full mt-2">
        {isLoading ? '가입 중…' : '회원가입'}
      </button>
    </form>
  );
}
