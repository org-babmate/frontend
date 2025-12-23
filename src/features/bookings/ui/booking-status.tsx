import { BookingStatusCount } from '@/entities/bookings/model/types';
import { Dot } from 'lucide-react';

function BookingStatus({ pending, accepted, completed, cancelled, declined }: BookingStatusCount) {
  return (
    <div className="flex flex-row w-full justify-between">
      <Status status={'Pending'} value={pending.count} hasUnread={pending.hasUnread} />
      <Status status={'Accepted'} value={accepted.count} hasUnread={accepted.hasUnread} />
      <Status
        status={'Cancelled'}
        value={cancelled.count + declined.count}
        hasUnread={cancelled.hasUnread || declined.hasUnread}
      />
      <Status status={'Completed'} value={completed.count} hasUnread={completed.hasUnread} />
    </div>
  );
}

function Status({
  status,
  value,
  hasUnread,
}: {
  status: string;
  value: number;
  hasUnread: boolean;
}) {
  return (
    <div className="px-2.5 justify-between items-center flex flex-col gap-4">
      <div className="text-body-lg">{status}</div>
      <div className="flex flex-row h-fit justify-center">
        <div className="text-title-lg">{value}</div>
        {hasUnread && <div className="size-1 bg-[#EF4040] rounded-full"></div>}
      </div>
    </div>
  );
}

export default BookingStatus;
