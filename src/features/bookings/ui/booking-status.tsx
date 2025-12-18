import { BookingStatusCount } from '@/entities/bookings/model/types';

function BookingStatus({ pending, accepted, completed, cancelled }: BookingStatusCount) {
  return (
    <div className="flex flex-row">
      <Status status={'Pending'} value={pending.count} hadUnread={pending.hasUnread} />
      <Status status={'Accepted'} value={accepted.count} hadUnread={accepted.hasUnread} />
      <Status status={'Cancelled'} value={cancelled.count} hadUnread={cancelled.hasUnread} />
      <Status status={'Completed'} value={completed.count} hadUnread={completed.hasUnread} />
    </div>
  );
}

function Status({
  status,
  value,
  hadUnread,
}: {
  status: string;
  value: number;
  hadUnread: boolean;
}) {
  return (
    <div className="px-2.5 justify-between items-center flex flex-col gap-4">
      <div className="text-body-lg">{status}</div>
      <div className="text-body-lg">{value}</div>
    </div>
  );
}

export default BookingStatus;
