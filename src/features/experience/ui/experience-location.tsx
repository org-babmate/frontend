import { MapPin } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  meetupLocation: string;
  setMeetupLocation: Dispatch<SetStateAction<string>>;
  venue: string;
  setVenue: Dispatch<SetStateAction<string>>;
}

function ExperienceLocation({ meetupLocation, setMeetupLocation, venue, setVenue }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-headline-lg text-gray-600">장소를 설정해 주세요</h1>
      <div className="flex flex-col gap-8 mt-6">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-gray-600 text-body-xl">진행 장소</h2>
          <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
            <MapPin className="text-gray-400" />
            <input
              placeholder="진행 장소를 추가해주세요"
              className="text-body-lg text-black  outline-0"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-gray-600 text-body-xl">모임 장소</h2>
          <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
            <MapPin className="text-gray-400" />
            <input
              placeholder="모임 장소를 추가해주세요"
              className="text-body-lg text-black  outline-0"
              type="text"
              value={meetupLocation}
              onChange={(e) => setMeetupLocation(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceLocation;
