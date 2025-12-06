'use client';

import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthStoreState extends AuthState {
  setAccessToken: (tokens: AuthState) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: ({ accessToken, refreshToken }: AuthState) =>
    set({ accessToken: accessToken, refreshToken: refreshToken }),
  clearAuth: () => set({ accessToken: null, refreshToken: null }),
}));

// 개발환경에서만 window에 노출
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).authStore = useAuthStore;
}
