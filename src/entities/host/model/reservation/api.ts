import { BookingResponse, BookingStatusCount } from '@/entities/bookings/model/types';
import { apiClient } from '@/shared/api/client';

//GET : /api/host/reservations
export async function getHostReservationList(): Promise<BookingResponse[]> {
  const res = await apiClient.get<BookingResponse[]>('/host/reservations');
  return res.data;
}

//GET : /api/host/reservations/counts
export async function getHostReservationStautsCounts(): Promise<BookingStatusCount> {
  const res = await apiClient.get<BookingStatusCount>('/host/reservations/counts');
  return res.data;
}

//GET : /api/host/reservations/{id}
export async function getHostReservationDetail(id: string): Promise<BookingResponse> {
  const res = await apiClient.get<BookingResponse>(`/host/reservations/{id}`);
  return res.data;
}

//POST : /api/host/reservations/{id}/accpet
export async function accpetReservation(id: string): Promise<BookingResponse> {
  const res = await apiClient.post<BookingResponse>(`/host/reservations/${id}/accept`);
  return res.data;
}
//POST : /api/host/reservations/{id}/reject
export async function rejectReservation(id: string): Promise<BookingResponse> {
  const res = await apiClient.post<BookingResponse>(`/host/reservations/${id}/reject`);
  return res.data;
}
