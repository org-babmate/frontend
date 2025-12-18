'use client';

import { create } from 'zustand';

interface ReservationState {
  scheduleId: string;
  experienceId: string;
  guestCount: number;
}

interface ReservationStateStoreState extends ReservationState {
  setReservation: (reservation: ReservationState) => void;
  clearReservation: () => void;
}

export const useReservationStore = create<ReservationStateStoreState>((set) => ({
  scheduleId: '',
  experienceId: '',
  guestCount: 0,
  setReservation: ({ scheduleId, experienceId, guestCount }: ReservationState) =>
    set({ scheduleId, experienceId, guestCount }),
  clearReservation: () => set({ scheduleId: '', experienceId: '', guestCount: 0 }),
}));
