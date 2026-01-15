'use client';

import { hydrate } from '@tanstack/react-query';
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

      setAuthed: (v) => set({ authed: v, expiredAt: v ? Date.now() + 1000 * 60 * 60 : undefined }),

      clearAuth: () => {
        useAuthStore.persist.clearStorage();
        set({ authed: false, expiredAt: undefined, hydrated: true });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          useAuthStore.setState({ hydrated: true });
          return;
        }

        const { expiredAt } = useAuthStore.getState();
        if (expiredAt && Date.now() > expiredAt) {
          useAuthStore.persist.clearStorage();
          useAuthStore.setState({
            authed: false,
            expiredAt: undefined,
          });
        }
        useAuthStore.setState({ hydrated: true });
      },
    },
  ),
);
