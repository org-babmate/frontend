import { GoogleLoginButton } from '@/features/auth/google-login/ui/google-login-button';
import { LoginForm } from '@/features/auth/login/ui/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md flex flex-col gap-3">
        <LoginForm />
        <GoogleLoginButton />
      </div>
    </main>
  );
}
