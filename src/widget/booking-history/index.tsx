import { BookingResponse } from '@/entities/bookings/model/types';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import React from 'react';

function BookingHistory({ list }: { list: BookingResponse[] }) {
  return (
    <div>
      {list.map((value) => {
        return (
          <ExperienceItem
            key={value.scheduleId}
            title={value.experience.title}
            date={value.schedule.date}
            time={`${value.schedule.startTime} - ${value.schedule.endTime}`}
            description={''}
            image={value.experience.thumbnailUrl}
          />
        );
      })}
    </div>
  );
}

export default BookingHistory;
