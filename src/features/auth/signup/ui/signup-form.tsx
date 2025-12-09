'use client';

import { useRouter } from 'next/navigation';
import { useSignupForm } from '../model/use-signup-form';
import { FormField } from '@/shared/ui/form';
import { Dispatch, SetStateAction } from 'react';

interface SignupFormProps {
  setVerified: Dispatch<SetStateAction<boolean>>;
}

export function SignupForm({ setVerified }: SignupFormProps) {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useSignupForm(() => {
    // router.push('/verification');
    setVerified(true);
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-black">
      <FormField label="name" error={errors.name?.message}>
        <input placeholder="name" {...register('name')} className="p-3 bg-[#F3F3F5] rounded-lg" />
      </FormField>
      <FormField label="E-mail" error={errors.email?.message}>
        <input
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="p-3 bg-[#F3F3F5] rounded-lg"
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="p-3 bg-[#F3F3F5] rounded-lg"
        />
      </FormField>

      <FormField label="Confirm Password" error={errors.passwordConfirm?.message}>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register('passwordConfirm')}
          className="p-3 bg-[#F3F3F5] rounded-lg"
        />
      </FormField>

      {error && (
        <p className="text-xs text-red-500">
          이미 사용 중인 이메일이거나, 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-3 bg-black text-white rounded-lg"
      >
        {isLoading ? 'pending...' : 'Sign Up'}
      </button>
    </form>
  );
}
