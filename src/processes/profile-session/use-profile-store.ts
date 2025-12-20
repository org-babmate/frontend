'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  mode: 'hosts' | 'users';
  name: string;
  isHost: boolean;
}

interface UserStateStoreState extends UserState {
  setUser: (payload: Partial<UserState>) => void;
  clearUser: () => void;
}
export const useUserStore = create<UserStateStoreState>()(
  persist(
    (set) => ({
      mode: 'users',
      name: '',
      isHost: false,

      setUser: (payload: Partial<UserState>) =>
        set((prev) => ({
          ...prev,
          ...payload,
        })),

      clearUser: () =>
        set({
          mode: 'users',
          name: '',
          isHost: false,
        }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
