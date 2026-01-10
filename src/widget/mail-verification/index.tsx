'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function MailVerfication({ email }: { email: string }) {
  const router = useRouter();
  return (
    <main className="sm:min-h-dvh flex flex-col w-full">
      <header className="flex w-full justify-end mt-8.25 mb-14">
        <button onClick={() => router.back()}>
          <X />
        </button>
      </header>
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <h1>Check your E-mail</h1>
        <p>We sent a verification link to {email}</p>
        <p>
          Please check your email. We've sent a verification link to your email! (If you don't see
          it, make sure to check your spam folder and other folders too!)
        </p>
      </div>
    </main>
  );
}

export default MailVerfication;
