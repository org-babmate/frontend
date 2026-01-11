'use client';

import { useEmailRevalidateMutation } from '@/features/auth/resend-email';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// import { useMyHostProfileQuery } from '@/features/host/model/host-profile-queries';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
// import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import { toast } from 'sonner';

export default function VerifiedClient() {
  const { mutate, isError, error } = useEmailRevalidateMutation();
  const params = useSearchParams();
  const router = useRouter();

  const authed = useAuthStore((s) => s.authed);
  const setAuth = useAuthStore((s) => s.setAuthed);

  // const {
  //   data: userProfile,
  //   isLoading: isUserProfileLoading,
  //   isSuccess: isUserProfileSuccess,
  //   isError: isUserProfileError,
  // } = useUserProfileQuery({ enabled: true });

  useEffect(() => {
    const success = params.get('success');
    if (success === 'true') {
      setAuth(true);
      router.replace('/');
    }
  }, [params, router, setAuth]);

  useEffect(() => {
    if (isError) {
      toast.error(String(error ?? '인증 처리 중 오류가 발생했습니다.'));
    }
  }, [isError, error]);

  // TODO: email은 실제 입력/스토어/params 등에서 가져와야 함
  return <button onClick={() => mutate({ email: '' })}>Revalidate</button>;
}
