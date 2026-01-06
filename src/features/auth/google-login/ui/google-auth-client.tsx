'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { Loader } from 'lucide-react';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';

export default function GoogleOAuthCallbackClient() {
  const router = useRouter();
  const { data: profile, isLoading } = useUserProfileQuery();
  const { setAuthed } = useAuthStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!profile) return; // 아직 로딩 중이면 아무 것도 안 함

    setAuthed(true);

    const roles = Array.isArray(profile.roles) ? profile.roles : [];

    setUser({
      ...profile,
      mode: 'users',
      isHost: roles.length > 1,
    });

    router.replace('/');
  }, [profile, setAuthed, setUser, router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      {isLoading && <Loader />}
    </main>
  );
}
