'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type AuthStoreState = AuthState & {
  setAccessToken: (payload: AuthState) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAccessToken: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),

      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-store', // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
