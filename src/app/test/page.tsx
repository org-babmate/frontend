'use client';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useRouter } from 'next/navigation';

function TestPage() {
  const token = useAuthStore();
  const router = useRouter();

  const { mutate } = useLogout(() => router.push('/test'));
  const handleLogOut = async () => {
    await mutate();
    token.clearAuth();
  };
  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center h-32">
      로그인 된 상태
      <button onClick={handleLogOut} className="bg-red-400">
        log out
      </button>
    </div>
  );
}

export default TestPage;
