'use client';
import { useEmailRevalidateMutation } from '@/features/auth/resend-email';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifiedPage() {
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
  //FIX : Email
  return (
    <Suspense fallback={null}>
      {/* <button onClick={() => mutate({ email: '' })}>Revalidate</button>/ */}
    </Suspense>
  );
}
