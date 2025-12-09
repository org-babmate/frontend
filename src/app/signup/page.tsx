'use client';
import { GoogleLoginButton } from '@/features/auth/google-login/ui/google-login-button';
import { SignupForm } from '@/features/auth/signup/ui/signup-form';
import MailVerfication from '@/widget/mail-verification';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  return (
    <main className="flex items-center justify-center bg-slate-50">
      <div className="w-full bg-white">
        <header className="flex justify-between mt-[33px] mb-14">
          <h1>Sign up</h1>
          <button onClick={() => router.back()}>
            <X />
          </button>
        </header>
        <section className="flex flex-col gap-8">
          {!verified ? <SignupForm setVerified={setVerified} /> : <MailVerfication />}
          <hr />
          <GoogleLoginButton />
        </section>
      </div>
    </main>
  );
}
