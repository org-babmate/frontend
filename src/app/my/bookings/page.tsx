'use client';

import { useBookingListQuery, useBookingStatusQuery } from '@/features/bookings/model/use-booking';
import BookingStatus from '@/features/bookings/ui/booking-status';
import Header from '@/shared/ui/header';
import BookingHistory from '@/widget/booking-history';

function MyBookingPage() {
  const { data: bookingList, isLoading: isbookingLoading } = useBookingListQuery();
  const { data: statusCounts, isLoading: isStatusLoading } = useBookingStatusQuery();
  const today = new Date();

  if (!bookingList || !statusCounts) {
    return <div>...Loading</div>;
  }

  const upcoming = bookingList.filter((item) => {
    const target = new Date(item.schedule.date);
    return target < today;
  });

  const past = bookingList.filter((item) => {
    const target = new Date(item.schedule.date);
    return target > today;
  });

  return (
    <div>
      <Header />
      <h1 className="text-headline-lg mb-5 mt-[72px]">My booking</h1>
      <BookingStatus
        pending={statusCounts.pending}
        accepted={statusCounts.accepted}
        completed={statusCounts.completed}
        cancelled={statusCounts.cancelled}
      />
      <hr className="border-2 w-screen mt-[30px] -mx-4 md:-mx-60" />
      {upcoming.length !== 0 && (
        <>
          <h3 className="mt-5">Upcoming</h3>
          <BookingHistory list={upcoming} />
        </>
      )}

      {past.length !== 0 && (
        <>
          <hr className="border-2 w-screen mt-[30px] -mx-4 md:-mx-60" />
          <h3 className="mt-5">Past</h3>
          <BookingHistory list={past} />
        </>
      )}
    </div>
  );
}

export default MyBookingPage;
