'use client';

import { useMutation } from '@tanstack/react-query';
import { exchangeGoogleCode } from '@/entities/auth/model/api';
import type { AuthResponse } from '@/entities/auth/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

interface Options {
  onSuccess?: (data: AuthResponse) => void;
}

interface Variables {
  code: string;
}

export function useGoogleAuth(options: Options = {}) {
  const setTokens = useAuthStore((s) => s.setAccessToken);
  return useMutation({
    mutationFn: (vars: Variables) => exchangeGoogleCode(vars.code),
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken) {
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          hydrated: true,
        });
      }
      options.onSuccess?.(data);
    },
  });
}
