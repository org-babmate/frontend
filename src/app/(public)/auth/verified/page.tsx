'use client';
import { useEmailRevalidateMutation } from '@/features/auth/resend-email';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifiedPage() {
  const { mutate, isError, data } = useEmailRevalidateMutation();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = params.get('success');
    if (success === 'true') {
      router.replace('/login');
      return;
    }
  }, [params, router]);

  if (isError) {
    alert(data);
  }
  //FIX : Email
  return <button onClick={() => mutate({ email: '' })}>Revalidate</button>;
}
