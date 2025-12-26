'use client';
import { Schedules } from '@/entities/experiences/model/types';
import { useRegisterExperienceMutation } from '@/features/experience/model/manage-host-experience';
import ExperienceCalendar from '@/features/experience/ui/experience-calendar';
import ExperienceCategories from '@/features/experience/ui/experience-categories';
import ParticipantCountInput from '@/features/experience/ui/experience-cost';
import ExperienceDescription from '@/features/experience/ui/experience-description';
import ExperienceTitleInput from '@/features/experience/ui/experience-title';
import { cn } from '@/shared/lib/utils';
import { Currency } from '@/shared/types/types';
import ModalDim from '@/shared/ui/modal-dim';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  //COST&PARTICIPANT
  const [maxParticipant, setMaxParticipant] = useState(0);
  const [minParticipant, setMinParticipant] = useState(0);
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [price, setPrice] = useState('');
  //DATES
  const [scheduleList, setScheduleList] = useState<Schedules[]>([]);
  const router = useRouter();
  //Modal
  const [showCreatingModal, setShowCreatingModal] = useState(false);

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return selectedCategory.trim().length > 0;

      case 2:
        return title.trim().length > 0;

      case 3:
        return description.trim().length > 0 && images.length > 0;

      case 4:
        return (
          meetupLocation.trim().length > 0 && minParticipant > 0 && maxParticipant > minParticipant
        );

      case 5:
        return scheduleList.length > 0;

      default:
        return false;
    }
  };

  const isCurrentStepValid = isStepValid(step);

  const { mutate, isError, isPending, data } = useRegisterExperienceMutation(async (data) => {
    setShowCreatingModal(true);
    await sleep(1000);
    router.push(`/host/dashboard`);
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
        meetingPlace: meetupLocation,
        meetingPlaceLat: 0,
        meetingPlaceLng: 0,
        durationHours: 2,
        destinationPlace: 'Over the rainbow',
        destinationPlaceLat: 0,
        destinationPlaceLng: 0,
        minGuests: minParticipant,
        maxGuests: maxParticipant,
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
        <button onClick={() => router.back()}>
          <X />
        </button>
      </div>
      <div className="flex flex-row mt-4 gap-1">
        <hr className={cn('flex-1 border', step >= 1 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 2 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 3 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 4 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 5 && 'border-black')} />
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
          <ParticipantCountInput
            meetupLocation={meetupLocation}
            setMeetupLocation={setMeetupLocation}
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
        {step === 5 && <ExperienceCalendar onScheduleChange={setScheduleList} />}
      </div>
      <div className="flex flex-row justify-between items-end w-full px-1 pt-3 pb-8">
        <button
          onClick={() => setStep(step - 1)}
          className={cn('text-body-lg py-3 px-5', step > 1 ? 'visible' : 'invisible')}
          disabled={step <= 1}
        >
          이전
        </button>
        {step >= 5 ? (
          <button
            className="bg-black text-purewhite text-body-lg py-3 px-5 rounded-xl"
            onClick={handleSubmit}
            disabled={isPending || !isCurrentStepValid}
          >
            {isPending ? '처리중 …' : '저장'}
          </button>
        ) : (
          <button
            className="bg-black text-purewhite text-body-lg py-3 px-5 rounded-xl"
            onClick={() => setStep(step + 1)}
            disabled={!isCurrentStepValid}
          >
            다음
          </button>
        )}
      </div>
      {showCreatingModal && (
        <ModalDim>
          <div className="text-body-md text-gray-900">생성 중입니다.</div>
        </ModalDim>
      )}
    </div>
  );
}

export default ExperienceSteps;
