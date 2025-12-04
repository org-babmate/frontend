'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGoogleAuth } from '@/features/auth/google-login/model/use-google-auth';

export default function GoogleOAuthCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const { mutate, isPending, error } = useGoogleAuth({
    onSuccess: () => {
      router.replace('/');
    },
  });

  useEffect(() => {
    if (code) {
      mutate({ code });
    }
  }, [code, mutate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-sm text-slate-600">
        {isPending && <p>Google 계정을 확인하는 중입니다…</p>}
        {error && <p className="text-red-500">로그인에 실패했습니다. 다시 시도해주세요.</p>}
        {!isPending && !error && !code && <p className="text-red-500">유효하지 않은 접근입니다.</p>}
      </div>
    </main>
  );
}
