'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
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
      hydrated: false,

      setAccessToken: ({ accessToken, refreshToken = null }) => set({ accessToken, refreshToken }),

      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hydrated: true });
      },
    },
  ),
);
