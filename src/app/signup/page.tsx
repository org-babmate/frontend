import { SignupForm } from '@/features/auth/signup/ui/signup-form';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <SignupForm />
      </div>
    </main>
  );
}
