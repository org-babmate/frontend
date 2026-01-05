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
    <main className="sm:min-h-screen flex flex-col items-center justify-center w-full">
      <div className="w-full flex flex-col gap-3">
        <header className="flex justify-between mt-[33px] mb-14">
          <h1>Login</h1>
          <button onClick={() => router.back()}>
            <X />
          </button>
        </header>

        <LoginForm redirect={redirect} />

        <hr />

        <GoogleLoginButton />

        <Link href="/signup" className="text-sm underline-offset-2 underline">
          Don’t have an account? Sign up
        </Link>
      </div>
    </main>
  );
}
