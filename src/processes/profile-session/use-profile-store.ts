'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfileResponse as UserProfile } from '@/entities/user/model/types';

type UserMode = 'users' | 'hosts';

interface UserState extends Partial<UserProfile> {
  mode: UserMode;
  isHost: boolean;
}
interface UserStateStoreState extends UserState {
  hydrated: boolean;
  updateMode: (mode: UserMode) => void;
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

      updateMode: (mode: UserMode) =>
        set((state) => ({
          ...state,
          mode,
        })),
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
