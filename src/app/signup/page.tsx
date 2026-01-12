'use client';

import { SignupForm } from '@/features/auth/signup/ui/signup-form';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center bg-white w-full">
      <div className="w-full bg-white ">
        <header className="flex  py-3.5 px-4 w-full relative justify-center items-center mb-8">
          <h1 className="text-label ty-heading-2">Sign up</h1>
          <button onClick={() => router.back()} className="absolute right-4">
            <X />
          </button>
        </header>
        <SignupForm />
      </div>
    </main>
  );
}
