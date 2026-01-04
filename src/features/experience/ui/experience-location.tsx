import { SeoulLocation, SEOUL_LOCATIONS } from '@/shared/data/locations';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { MapPin } from 'lucide-react';
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
      <h1 className="text-headline-lg text-gray-600">장소를 설정해 주세요</h1>
      <div className="flex flex-col gap-8 mt-6">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-gray-600 text-body-xl">모임 장소</h2>
          <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
            <MapPin className="text-gray-400" />
            <input
              placeholder="모임 장소를 추가해주세요"
              className="text-body-lg text-black  outline-0 flex-1"
              type="text"
              value={meetupLocation}
              onChange={(e) => setMeetupLocation(e.target.value)}
            ></input>
          </div>
          <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
            <MapPin className="text-gray-400" />
            <CustomDropDownRadio
              value={meetingArea}
              onChange={setMeetingArea}
              values={SEOUL_LOCATIONS}
              className="ring ring-gray-100 px-4 py-3 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceLocation;
