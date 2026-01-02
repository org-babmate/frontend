'use client';

import {
  useBookingListQuery,
  useBookingStatusQuery,
  useCancelBookingMutation,
} from '@/features/bookings/model/booking-queries';
import BookingStatus from '@/features/bookings/ui/booking-status';
import BookingHistory from '@/widget/booking-history';
import { useRouter } from 'next/navigation';

function MyBookingPage() {
  const { data: bookingList, isLoading: isbookingLoading } = useBookingListQuery();
  const { data: statusCounts, isLoading: isStatusLoading } = useBookingStatusQuery();
  const { mutate: cancelBooking } = useCancelBookingMutation();
  const router = useRouter();

  if (!bookingList || !statusCounts) {
    return <div>...Loading</div>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = bookingList.filter((item) => {
    const [y, m, d] = item.schedule.date.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    return target >= today && item.status !== 'Cancelled' && item.status !== 'Declined';
  });

  const past = bookingList.filter((item) => {
    const [y, m, d] = item.schedule.date.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    return target < today || item.status === 'Cancelled' || item.status === 'Declined';
  });
  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    router.refresh();
  };
  return (
    <div>
      <h1 className="text-headline-lg mb-5 mt-18">My booking</h1>
      <BookingStatus
        pending={statusCounts.pending}
        accepted={statusCounts.accepted}
        completed={statusCounts.completed}
        cancelled={statusCounts.cancelled}
        declined={statusCounts.declined}
      />

      {upcoming.length !== 0 && (
        <>
          <hr className="border-2 w-screen mt-7.5 -mx-4 md:-mx-60" />
          <h3 className="mt-5">Upcoming</h3>
          <BookingHistory list={upcoming} guestCancel={handleCancel} />
        </>
      )}

      {past.length !== 0 && (
        <>
          <hr className="border-2 w-screen mt-7.5 -mx-4 md:-mx-60" />
          <h3 className="mt-5">Past</h3>
          <BookingHistory list={past} />
        </>
      )}
    </div>
  );
}

export default MyBookingPage;
