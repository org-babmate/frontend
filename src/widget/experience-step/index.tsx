'use client';
import { Schedules } from '@/entities/experiences/model/types';
import { useRegisterExperienceMutation } from '@/features/experience/model/manage-host-experience';
import ExperienceCalendar from '@/features/experience/ui/experience-calendar';
import ExperienceCategories from '@/features/experience/ui/experience-categories';
import ParticipantCountInput from '@/features/experience/ui/experience-cost';
import ExperienceDescription from '@/features/experience/ui/experience-description';
import ExperienceLocation from '@/features/experience/ui/experience-location';
import ExperienceTitleInput from '@/features/experience/ui/experience-title';
import { cn } from '@/shared/lib/utils';
import { Currency } from '@/shared/types/types';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SetStateAction, useState } from 'react';

export type Mode = 'uniform' | 'individual';
export type TimeMode = 'uniform' | 'individual';
export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

function ExperienceSteps() {
  //6steps
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  //Category
  const [selectedCategory, setSelectedCategory] = useState('');
  //Location
  const [meetupLocation, setMeetupLocation] = useState('');
  const [venue, setVenue] = useState('');
  //COST&PARTICIPANT
  const [maxParticipant, setMaxParticipant] = useState('');
  const [minParticipant, setMinParticipant] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [price, setPrice] = useState('');
  //DATES
  const [scheduleList, setScheduleList] = useState<Schedules[]>([]);
  const router = useRouter();
  const { mutate, isError, isPending } = useRegisterExperienceMutation((data) => {
    router.push(`/`);
  });

  const handleSubmit = async () => {
    await mutate({
      imageFiles: images,
      folder: 'experiences',
      payload: {
        category: selectedCategory,
        title: title,
        description: description,
        videoUrl: '',
        photos: [],
        meetingPlace: 'SomeWhere',
        meetingPlaceLat: 0,
        meetingPlaceLng: 0,
        durationHours: 2,
        destinationPlace: 'Over the rainbow',
        destinationPlaceLat: 0,
        destinationPlaceLng: 0,
        minGuests: parseInt(minParticipant),
        maxGuests: parseInt(maxParticipant),
        price: parseInt(price),
        currency: currency,
      },
      files: images.map((value, index) => {
        return {
          fileName: `experience-image-${index}`,
          contentType: value.type,
          fileSize: value.size,
        };
      }),
      schedules: scheduleList,
    });
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full flex justify-end py-4">
        <button onClick={() => router.back}>
          <X />
        </button>
      </div>
      <div className="flex flex-row mt-4 gap-1">
        <hr className={cn('flex-1 border', step >= 1 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 2 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 3 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 4 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 5 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 6 && 'border-black')} />
      </div>
      <div className="flex-1 mt-9">
        {step === 1 && (
          <ExperienceCategories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {step === 2 && <ExperienceTitleInput title={title} setTitle={setTitle} />}
        {step === 3 && (
          <ExperienceDescription
            description={description}
            setDescription={setDescription}
            value={images}
            onChange={setImages}
            maxFiles={5}
          />
        )}
        {step === 4 && (
          <ExperienceLocation
            meetupLocation={meetupLocation}
            setMeetupLocation={setMeetupLocation}
            venue={venue}
            setVenue={setVenue}
          />
        )}
        {step === 5 && (
          <ParticipantCountInput
            price={price}
            setPrice={setPrice}
            currency={currency}
            setCurrency={setCurrency}
            minParticipant={minParticipant}
            setMinParticipant={setMinParticipant}
            maxParticipant={maxParticipant}
            setMaxParticipant={setMaxParticipant}
          />
        )}
        {step === 6 && <ExperienceCalendar onScheduleChange={setScheduleList} />}
      </div>
      <div className="flex flex-row justify-between items-end w-full px-1 pt-3 pb-8">
        <button
          onClick={() => setStep(step - 1)}
          className={cn('text-body-lg py-3 px-5', step > 1 ? 'visible' : 'invisible')}
          disabled={step <= 1}
        >
          이전
        </button>
        {step >= 6 ? (
          <button onClick={handleSubmit}>저장</button>
        ) : (
          <button
            className="bg-black text-purewhite text-body-lg py-3 px-5 rounded-xl"
            onClick={() => setStep(step + 1)}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}

export default ExperienceSteps;
