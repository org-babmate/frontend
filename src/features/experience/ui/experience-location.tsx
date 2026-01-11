import { SeoulLocation, SEOUL_LOCATIONS } from '@/shared/data/locations';
import { cn } from '@/shared/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  meetupLocation: string;
  setMeetupLocation: Dispatch<SetStateAction<string>>;
  meetingArea: SeoulLocation;
  setMeetingArea: Dispatch<SetStateAction<SeoulLocation>>;
}

function ExperienceLocation({
  meetupLocation,
  setMeetupLocation,
  meetingArea,
  setMeetingArea,
}: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="ty-heading-1 text-label">장소를 설정해 주세요</h1>
      <div className="grid grid-cols-3 gap-2 mt-6">
        {SEOUL_LOCATIONS.map((value) => {
          return (
            <div
              key={value.id}
              onClick={() => setMeetingArea(value.id)}
              className={cn(
                'ring ring-gray-100 py-4 rounded-2 ty-body-1-medium text-center',
                meetingArea === value.id
                  ? 'bg-primary-normal text-white'
                  : 'text-label-subtle bg-white',
              )}
            >
              {value.labelKo}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceLocation;
