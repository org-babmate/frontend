// features/host/model/reservation/query-keys.ts
export const hostReservationQueryKeys = {
  all: ['hostReservation'] as const,

  list: () => [...hostReservationQueryKeys.all, 'list'] as const,

  detail: (id: string) => [...hostReservationQueryKeys.all, 'detail', id] as const,

  status: () => [...hostReservationQueryKeys.all, 'status'] as const,
};
