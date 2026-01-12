'use client';

import { GoogleLoginButton } from '@/features/auth/google-login/ui/google-login-button';
import { LoginForm } from '@/features/auth/login/ui/login-form';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get('redirect');
  const redirect = rawRedirect && rawRedirect.startsWith('/') ? rawRedirect : '/';

  return (
    <main className=" flex flex-col items-center justify-center w-full px-4">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <header className="flex  py-3.5 px-4 w-full relative justify-center items-center mb-8">
          <h1 className="text-label ty-heading-2">Sign up</h1>
          <button onClick={() => router.back()} className="absolute right-4">
            <X />
          </button>
        </header>
        <LoginForm redirect={redirect} />

        <div className="flex flex-row gap-4 items-center justify-center w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="ty-label-1-medium text-label-subtle">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <GoogleLoginButton />

        <div className="ty-label-1-medium text-labe-subtle">
          Don’t have an account?
          <Link
            href="/signup"
            className="ty-label-1-semibold text-label-blue underline underline-offset-2"
          >
            {` Sign up`}
          </Link>
        </div>
      </div>
    </main>
  );
}
