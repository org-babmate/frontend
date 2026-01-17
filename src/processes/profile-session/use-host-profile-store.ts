'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HostProfile } from '@/entities/host/model/types';

interface HostStateStoreState extends Partial<HostProfile> {
  hydrated: boolean;
  setHost: (payload: Partial<HostProfile>) => void;
  clearHost: () => void;
}

const initialHost: Partial<HostProfile> = {
  id: '',
  profileImage: '',
  nickname: '',
};

export const useHostStore = create<HostStateStoreState>()(
  persist(
    (set) => ({
      ...initialHost,
      hydrated: false,

      setHost: (payload) =>
        set((prev) => ({
          ...prev,
          ...payload,
        })),

      clearHost: () =>
        set(() => ({
          ...initialHost,
        })),
    }),
    {
      name: 'host-profile',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        useHostStore.setState({ hydrated: true });
      },
    },
  ),
);
