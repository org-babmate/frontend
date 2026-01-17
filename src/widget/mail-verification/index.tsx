'use client';

import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { useRouter } from 'next/navigation';

function MailVerfication({ email }: { email: string }) {
  return (
    <main className="min-h-dvh flex flex-col w-full">
      <div className="w-full h-full flex flex-col items-center justify-center mt-22.5 px-6">
        <h1 className="ty-heading-2 text-primary-normal">Check your E-mail</h1>
        <p className="ty-body-2-regular text-label mt-6">We sent a verification link to</p>
        <span className="ty-body-2-semibold text-label">{email}</span>
        <div className="size-60 relative mt-11 ">
          <ImageWithFallback src={'/emailsent.png'} fill alt="email verification" />
        </div>
      </div>
    </main>
  );
}

export default MailVerfication;
