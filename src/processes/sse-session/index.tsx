import { create } from 'zustand';

type SseStore = {
  resetKey: number;
  bump: () => void;
};

export const useSseStore = create<SseStore>((set) => ({
  resetKey: 0,
  bump: () => set((s) => ({ resetKey: s.resetKey + 1 })),
}));
