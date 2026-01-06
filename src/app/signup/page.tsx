'use client';

import { SignupForm } from '@/features/auth/signup/ui/signup-form';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center bg-white w-full px-4">
      <div className="w-full bg-white">
        <header className="flex justify-between mt-[33px] mb-14">
          <h1>Sign up</h1>
          <button onClick={() => router.back()}>
            <X />
          </button>
        </header>
        <SignupForm />
      </div>
    </main>
  );
}
