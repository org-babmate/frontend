'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthState = {
  authed: boolean;
  hydrated: boolean;
  expiredAt?: number;
};

export type AuthStoreState = AuthState & {
  setAuthed: (v: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      authed: false,
      hydrated: false,
      expiredAt: undefined,
      setAuthed: (v) => set({ authed: v, expiredAt: Date.now() + 1000 * 60 * 60 }),
      clearAuth: () => {
        set({ authed: false, expiredAt: undefined, hydrated: true });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        const expiredAt = state?.expiredAt;

        if (expiredAt && Date.now() > expiredAt) {
          useAuthStore.persist.clearStorage();
          useAuthStore.setState({
            authed: false,
            hydrated: true,
            expiredAt: undefined,
          });
          return;
        }

        useAuthStore.setState({ hydrated: true });
      },
    },
  ),
);
