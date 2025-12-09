'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function MailVerfication() {
  const router = useRouter();
  return (
    <main className="sm:min-h-screen flex flex-col w-full">
      <header className="flex w-full justify-end mt-[33px] mb-14">
        <button onClick={() => router.back()}>
          <X />
        </button>
      </header>
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <h1>Check your E-mail</h1>
        <p>We sent a verification link to sarah05@gmail.com</p>
      </div>
    </main>
  );
}

export default MailVerfication;
