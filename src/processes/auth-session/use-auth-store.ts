'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthState = {
  authed: boolean;
  hydrated: boolean;
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
      setAuthed: (v) => set({ authed: v }),
      clearAuth: () => set({ authed: false }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hydrated: true });
      },
    },
  ),
);
