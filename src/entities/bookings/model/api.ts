// **상태(status)**: Pending, Accepted, Cancelled (기본값: Pending)

import {
  BookingResponse,
  BookingReuqest,
  BookingStatusCount,
} from '@/entities/bookings/model/types';
import { apiClient } from '@/shared/api/client';

// **제한 사항**:
// - 본인 Experience에 예약 불가
// - 이미 활성 예약(Pending/Accepted)이 있으면 불가
// - 과거 날짜 Experience 예약 불가?

// POST: /user/reservations
export async function registerBooking({
  scheduleId,
  guestCount,
}: BookingReuqest): Promise<BookingResponse> {
  const res = await apiClient.post<BookingResponse>(`/user/reservations`, {
    guestCount,
    scheduleId,
  });
  return res.data;
}

// GET: /api/user/reservations
export async function getBookingList(): Promise<BookingResponse[]> {
  const res = await apiClient.get<BookingResponse[]>('/user/reservations');
  return res.data;
}
//GET: /api/user/reservations/counts
export async function getBookingStautsCounts(): Promise<BookingStatusCount> {
  const res = await apiClient.get<BookingStatusCount>('/user/reservations/counts');
  return res.data;
}

// GET: /api/user/reservations/{id}
export async function getBooking(id: string): Promise<BookingResponse> {
  const res = await apiClient.get<BookingResponse>(`/user/reservations/${id}/`);
  return res.data;
}

// POST: : /api/user/reservations/{id}/cancel
export async function cancelBooking(id: string): Promise<BookingResponse> {
  const res = await apiClient.post<BookingResponse>(`/user/reservations/${id}/cancel`);
  return res.data;
}
