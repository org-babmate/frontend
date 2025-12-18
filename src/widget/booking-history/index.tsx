import { BookingResponse } from '@/entities/bookings/model/types';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import { getDateInfo } from '@/shared/lib/utils';
import React from 'react';

function BookingHistory({ list }: { list: BookingResponse[] }) {
  return (
    <div>
      {list.map((value, index) => {
        const { year, monthEngShort, day, monthEngLong } = getDateInfo(value.statusAt);
        const completed = value.status === 'cancelled' ? 'Cancelled by host' : 'Completed';
        return (
          <>
            {index !== 0 && <hr />}
            <ExperienceItem
              key={value.scheduleId}
              title={value.experience.title}
              dateTime={` ${day} ${monthEngLong} ${year} / ${value.schedule.startTime.slice(
                0,
                5,
              )} - ${value.schedule.endTime.slice(0, 5)}`}
              image={value.experience.thumbnailUrl}
              status={value.status}
              statusDescription={`${day} ${monthEngShort} ${year} ${completed}`}
            />
          </>
        );
      })}
    </div>
  );
}

export default BookingHistory;
