'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import { Loader } from 'lucide-react';

export default function VerifiedClient() {
  const params = useSearchParams();
  const success = params.get('success') === 'true';

  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuthed);

  const {
    data: userProfile,
    isLoading,
    isSuccess,
    isError,
  } = useUserProfileQuery({
    enabled: success,
  });

  useEffect(() => {
    if (!success) {
      router.replace('/login');
      return;
    }

    if (isError) {
      router.replace('/login'); // 또는 에러 페이지
      return;
    }

    if (isSuccess && userProfile) {
      setAuth(true);
      router.replace('/');
    }
  }, [success, isSuccess, isError, userProfile, router, setAuth]);

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Loader className="animate-spin size-6 " />
      </div>
    );
  }
  return null;
}
