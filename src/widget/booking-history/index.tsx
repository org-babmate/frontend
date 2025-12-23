import { BookingResponse } from '@/entities/bookings/model/types';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import { getDateInfo } from '@/shared/lib/utils';

function BookingHistory({
  list,
  reject,
  accept,
  guestCancel,
}: {
  list: BookingResponse[];
  reject?: (id: string) => Promise<void>;
  accept?: (id: string) => Promise<void>;
  guestCancel?: (id: string) => Promise<void>;
}) {
  return (
    <div>
      {list.map((value, index) => {
        const {
          year: statusYear,
          monthEngShort: statusMonth,
          day: statusDay,
        } = getDateInfo(value.statusAt);
        const { year, day, monthEngLong } = getDateInfo(value.schedule.date);
        const completed =
          value.status === 'Pending'
            ? 'Pending'
            : value.status === 'Cancelled'
            ? 'canceled by guest'
            : value.status === 'Declined'
            ? 'declined by host'
            : 'Completed';
        return (
          <div key={value.id}>
            {index !== 0 && <hr />}
            <ExperienceItem
              rejectClick={reject}
              acceptClick={accept}
              guestCancel={guestCancel}
              key={value.scheduleId}
              title={value.experience.title}
              dateTime={` ${day} ${monthEngLong} ${year} / ${value.schedule.startTime.slice(
                0,
                5,
              )} - ${value.schedule.endTime.slice(0, 5)}`}
              image={value.experience.thumbnailUrl}
              status={value.status}
              statusDescription={`${statusDay} ${statusMonth} ${statusYear} ${completed}`}
              id={value.id}
              experienceId={value.experience.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BookingHistory;
