'use client';

import { useBookingListQuery, useBookingStatusQuery } from '@/features/bookings/model/use-booking';
import BookingStatus from '@/features/bookings/ui/booking-status';
import BookingHistory from '@/widget/booking-history';

function MyBookingPage() {
  const { data: bookingList, isLoading: isbookingLoading } = useBookingListQuery();
  const { data: statusCounts, isLoading: isStatusLoading } = useBookingStatusQuery();
  return (
    <div>
      {!bookingList || !statusCounts ? (
        <div>...Loading</div>
      ) : (
        <>
          <BookingStatus
            pending={statusCounts.pending}
            accepted={statusCounts.accepted}
            completed={statusCounts.completed}
            cancelled={statusCounts.cancelled}
          />
          <BookingHistory />
        </>
      )}
    </div>
  );
}

export default MyBookingPage;
