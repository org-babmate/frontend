export const bookingQueryKeys = {
  all: ['booking'] as const,
  detail: (id: string) => [...bookingQueryKeys.all, 'detail', id] as const,
  list: () => [...bookingQueryKeys.all, 'list'] as const,
  status: () => [...bookingQueryKeys.all, 'status'] as const,
};
