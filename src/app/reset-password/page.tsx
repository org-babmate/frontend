'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useFindPasswordForm } from '@/features/auth/find-password/model/use-find-password-form';
import { ResetPasswordForm } from '@/features/auth/reset-password/ui/reset-password-form';

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
      <header className="flex justify-between mt-[33px] mb-14">
        <h1>Forgot password</h1>
        <button onClick={() => router.back()}>
          <X />
        </button>
      </header>
      <ResetPasswordForm />
    </div>
  );
}

export default RestorePassword;
