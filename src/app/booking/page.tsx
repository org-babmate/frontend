'use client';

import { useBookingListQuery } from '@/features/bookings/model/use-booking';
import BookingStatus from '@/features/bookings/ui/booking-status';
import BookingHistory from '@/widget/booking-history';

function BookingPage() {
  const { data, isLoading } = useBookingListQuery();
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <>
          <BookingStatus />
          <BookingHistory />
        </>
      )}
    </div>
  );
}

export default BookingPage;
