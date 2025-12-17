export interface BookingReuqest {
  scheduleId: 'string';
  guestCount: 1;
}

export interface BookingResponse {
  id: 'string';
  scheduleId: 'string';
  guestId: 'string';
  guestCount: 0;
  status: 'Pending';
  createdAt: '2025-12-17T07:40:35.995Z';
}
