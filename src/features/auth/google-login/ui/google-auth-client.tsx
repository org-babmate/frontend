'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import { useMyHostProfileQuery } from '@/features/host/model/host-profile-queries';
import { useHostStore } from '@/processes/profile-session/use-host-profile-store';

export default function GoogleOAuthCallbackClient() {
  const router = useRouter();
  const { setAuthed } = useAuthStore();
  const { setUser } = useUserStore();
  const { setHost } = useHostStore();
  const [fetchHost, setFetchHost] = useState(false);

  const { data: profile, isLoading, isError } = useUserProfileQuery({ enabled: true });
  const { data: hostProfile } = useMyHostProfileQuery(fetchHost);

  useEffect(() => {
    setAuthed(true);
  }, [setAuthed]);

  useEffect(() => {
    if (!profile) return;

    const roles = Array.isArray(profile.roles) ? profile.roles : [];
    const isHost = roles.length > 1;
    if (isHost) {
      setFetchHost(true);
    }

    setUser({ ...profile, mode: 'users', isHost: isHost });
    setHost({ ...hostProfile?.host });
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
