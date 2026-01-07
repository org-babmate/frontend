'use client';

import { useAppSSE } from '@/entities/bookings/model/revalidate';
import BookingStatus from '@/features/bookings/ui/booking-status';
import {
  useAcceptReservationMutation,
  useHostReservationQuery,
  useHostReservationStatusQuery,
  useRejectReservationMutation,
} from '@/features/host/model/reservation/use-host-reservation-mutation';
import BookingHistory from '@/widget/booking-history';
import { useRouter } from 'next/navigation';

function HostDashBoardPage() {
  const { data: hostReservationList, isLoading: isbookingLoading } = useHostReservationQuery();
  const { data: statusCounts, isLoading: isStatusLoading } = useHostReservationStatusQuery();
  const { mutate: acceptReservation } = useAcceptReservationMutation();
  const { mutate: rejectReservation } = useRejectReservationMutation();
  const router = useRouter();

  useAppSSE(true);

  if (!hostReservationList || !statusCounts) {
    return <div>...Loading</div>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //현재 날짜랑
  const upcoming = hostReservationList.filter((item) => {
    const [y, m, d] = item.schedule.date.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    return target >= today && item.status !== 'Cancelled' && item.status !== 'Declined';
  });
  const past = hostReservationList.filter((item) => {
    const [y, m, d] = item.schedule.date.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    return target < today || item.status === 'Cancelled' || item.status === 'Declined';
  });

  const handleAccept = async (id: string) => {
    await acceptReservation(id);
    router.refresh();
  };
  const handleReject = async (id: string) => {
    await rejectReservation(id);
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
          <BookingHistory list={upcoming} accept={handleAccept} reject={handleReject} />
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

export default HostDashBoardPage;
