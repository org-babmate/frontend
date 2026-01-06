'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';

export default function GoogleOAuthCallbackClient() {
  const router = useRouter();
  const { setAuthed } = useAuthStore();
  const { setUser } = useUserStore();

  const { data: profile, isLoading, isError } = useUserProfileQuery({ enabled: true });

  useEffect(() => {
    setAuthed(true);
  }, [setAuthed]);

  useEffect(() => {
    if (!profile) return;

    const roles = Array.isArray(profile.roles) ? profile.roles : [];

    setUser({ ...profile, mode: 'users', isHost: roles.length > 1 });
    router.replace('/');
  }, [profile, setUser, router]);

  useEffect(() => {
    if (!isError) return;
    router.replace('/login');
  }, [isError, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      {(isLoading || !profile) && !isError && <Loader />}
    </main>
  );
}
