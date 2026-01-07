'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProfileResponse as UserProfile } from '@/entities/user/model/types';

type UserMode = 'users' | 'hosts';

type UserData = Partial<UserProfile> & {
  mode: UserMode;
  isHost: boolean;
  id: string;
  email: string;
  roles: string[];
  name: string;
};

interface UserStateStoreState extends UserData {
  hydrated: boolean;
  updateMode: (mode: UserMode) => void;
  setUser: (payload: Partial<UserData>) => void;
  clearUser: () => void;
}

const initialUser: UserData = {
  id: '',
  email: '',
  roles: [],
  mode: 'users',
  name: '',
  isHost: false,
};

export const useUserStore = create<UserStateStoreState>()(
  persist(
    (set) => ({
      ...initialUser,
      hydrated: false,

      updateMode: (mode) => set((s) => ({ ...s, mode })),

      setUser: (payload) =>
        set((prev) => ({
          ...prev,
          ...payload,
        })),

      clearUser: () =>
        set(() => ({
          ...initialUser,
        })),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        useUserStore.setState({ hydrated: true });
      },
    },
  ),
);
