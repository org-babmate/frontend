'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

function deriveMode(pathname: string) {
  return pathname.startsWith('/host') ? 'hosts' : 'users';
}

export function ModeSync() {
  const pathname = usePathname();
  const mode = useUserStore((s) => s.mode);
  const updateMode = useUserStore((s) => s.updateMode);

  useEffect(() => {
    const nextMode = deriveMode(pathname);
    if (mode !== nextMode) updateMode(nextMode);
  }, [pathname, mode, updateMode]);

  return null;
}
