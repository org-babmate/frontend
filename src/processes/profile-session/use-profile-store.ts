'use client';

import { create } from 'zustand';

interface UserState {
  mode: 'hosts' | 'users';
  name: string;
}

interface UserStateStoreState extends UserState {
  setUser: (profile: UserState) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStateStoreState>((set) => ({
  mode: 'users',
  name: '',
  setUser: ({ mode, name }: UserState) => set({ mode, name }),
  clearUser: () => set({ mode: 'users', name: '' }),
}));
