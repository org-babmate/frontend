'use client';

import { useEmailRevalidateMutation } from '@/features/auth/resend-email';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifiedClient() {
  const { mutate, isError, error } = useEmailRevalidateMutation();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = params.get('success');
    if (success === 'true') {
      router.replace('/login');
    }
  }, [params, router]);

  useEffect(() => {
    if (isError) {
      // alert는 렌더 중 호출하면 안 좋음 → effect에서 처리
      alert(String(error ?? '인증 처리 중 오류가 발생했습니다.'));
    }
  }, [isError, error]);

  // TODO: email은 실제 입력/스토어/params 등에서 가져와야 함
  return <button onClick={() => mutate({ email: '' })}>Revalidate</button>;
}
