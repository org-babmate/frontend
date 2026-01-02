'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { FormField } from '@/shared/ui/form';
import { useFindPasswordForm } from '@/features/auth/find-password/model/use-find-password-form';

function RestorePassword() {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error } = useFindPasswordForm(() => {
    // router.push('/');
  });
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full flex flex-col gap-3">
      <header className="flex justify-between mt-8.25 mb-14">
        <h1>Forgot password</h1>
        <button onClick={() => router.back()}>
          <X />
        </button>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <FormField label="E-mail" error={errors.email?.message}>
            <input
              type="email"
              placeholder="E-mail address"
              {...register('email')}
              className="bg-gray-200 rounded-sm px-3 py-1"
            />
          </FormField>
        </form>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-black text-white py-2 rounded-sm"
        >
          {isLoading ? 'pending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default RestorePassword;
