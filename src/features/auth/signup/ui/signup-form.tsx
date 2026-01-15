'use client';

import { useSignupForm } from '../model/use-signup-form';
import { FormField } from '@/shared/ui/form';
import { useState } from 'react';
import MailVerfication from '@/widget/mail-verification';
import { cn } from '@/shared/lib/utils';
import { PasswordInput } from '@/shared/ui/input/password-Input';
import { useFormState, useWatch } from 'react-hook-form';

export function SignupForm() {
  const [verified, setVerified] = useState(false);
  const { form, handleSubmit, isLoading, error } = useSignupForm(() => {
    setVerified(true);
  });

  const { control, register } = form;

  const { errors, isValid } = useFormState({ control });

  const [email, name, password] = useWatch({
    control,
    name: ['email', 'name', 'password'],
  });

  const disable = !isValid || isLoading || !email?.length || !name?.length || !password?.length;
  return (
    <div className="w-full px-4">
      {!verified ? (
        <div className="h-dvh w-full">
          <form onSubmit={handleSubmit} className="space-y-5 text-black h-full w-full">
            <FormField label="Name" error={errors.name?.message}>
              <input
                placeholder="Your name"
                {...register('name')}
                className="px-4 py-3 bg-white ring ring-gray-200 rounded-4 ty-body-1-regular"
              />
            </FormField>
            <FormField label="E-mail" error={errors.email?.message}>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="px-4 py-3 bg-white ring ring-gray-200 rounded-4 ty-body-1-regular"
              />
            </FormField>
            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                {...register('password')}
                placeholder="Password"
                className="rounded-4"
              />
            </FormField>
            {error && (
              <p className="text-xs text-red-500">
                이미 사용 중인 이메일이거나, 잠시 후 다시 시도해주세요.
              </p>
            )}

            <div className="fixed left-0 bottom-0 w-full pt-3 px-4 pb-10 shadow-1">
              <button
                type="submit"
                disabled={disable}
                className={cn(
                  'py-3 mt-3  text-white rounded-2 w-full',
                  disable ? 'bg-gray-500' : 'bg-primary-normal',
                )}
              >
                {'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <MailVerfication email={email} />
      )}
    </div>
  );
}
