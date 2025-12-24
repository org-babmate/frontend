'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfileResponse as UserProfile } from '@/entities/user/model/types';

interface UserState extends Partial<UserProfile> {
  mode: 'hosts' | 'users';
  isHost: boolean;
}
interface UserStateStoreState extends UserState {
  hydrated: boolean;
  setUser: (payload: Partial<UserState>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStateStoreState>()(
  persist(
    (set) => ({
      hydrated: false,
      id: '',
      email: '',
      roles: [],
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
          hydrated: true,
          mode: 'users',
          name: '',
          isHost: false,
          id: '',
          email: '',
          roles: [],
        }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => () => {
        useUserStore.setState({ hydrated: true });
      },
    },
  ),
);
