'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { Loader } from 'lucide-react';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';

export default function GoogleOAuthCallbackClient() {
  const router = useRouter();
  const { data: profile } = useUserProfileQuery();
  const { setAuthed } = useAuthStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    setAuthed(true);
    if (profile && profile.roles) {
      setUser({ ...profile, mode: 'users', isHost: profile?.roles?.length > 1 });
    }
    router.push('/');
  }, [setAuthed, profile]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader />
    </main>
  );
}
