'use client';
import { Schedules } from '@/entities/experiences/model/types';
import { useRegisterExperienceMutation } from '@/features/experience/model/manage-host-experience';
import ExperienceCalendar from '@/features/experience/ui/experience-calendar';
import ExperienceCategories from '@/features/experience/ui/experience-categories';
import ParticipantCountInput from '@/features/experience/ui/experience-cost';
import ExperienceDescription from '@/features/experience/ui/experience-description';
import ExperienceLocation from '@/features/experience/ui/experience-location';
import ExperienceTitleInput from '@/features/experience/ui/experience-title';
import { CATEGORIES, CategoryValue } from '@/shared/data/categories';
import { cn } from '@/shared/lib/utils';
import { Currency } from '@/shared/types/types';
import ModalDim from '@/shared/ui/modal-dim';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { DateRange } from 'react-day-picker';

export const MODE_OPTIONS = [
  { label: '1시간', value: 1 },
  { label: '2시간', value: 2 },
  { label: '3시간', value: 3 },
  { label: '4시간', value: 4 },
  { label: '5시간', value: 5 },
  { label: '6시간', value: 6 },
];

function ExperienceSteps() {
  //Default Date & Time
  const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간(ms)
  const nowKST = new Date(Date.now() + KST_OFFSET);
  const today = new Date(nowKST);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const defaultDateRange: DateRange = {
    from: tomorrow,
    to: tomorrow,
  };
  const router = useRouter();
  //5steps
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  //Category
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>(CATEGORIES[0].value);
  //Location
  const [meetupLocation, setMeetupLocation] = useState('');
  //COST&PARTICIPANT
  const [maxParticipant, setMaxParticipant] = useState<number | null>(null);
  const [minParticipant, setMinParticipant] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [price, setPrice] = useState(0);
  //DATES
  const [finalScheduleList, setFinalScheduleList] = useState<Schedules[]>([]);
  const [durationHours, setDurationHours] = useState<number>(MODE_OPTIONS[0].value);

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
        return meetupLocation.trim().length > 0;

      case 5:
        return (
          minParticipant !== null &&
          maxParticipant !== null &&
          minParticipant > 0 &&
          maxParticipant > minParticipant
        );
      case 6:
        return finalScheduleList.length > 0;

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
        //TODO: FIX THIS
        durationHours: durationHours,
        destinationPlace: 'Over the rainbow',
        destinationPlaceLat: 0,
        destinationPlaceLng: 0,
        minGuests: minParticipant ?? 0,
        maxGuests: maxParticipant ?? 0,
        price: price,
        currency: currency,
        schedules: finalScheduleList,
      },
      files: images.map((value, index) => {
        return {
          fileName: `experience-image-${index}`,
          contentType: value.type,
          fileSize: value.size,
        };
      }),
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
        {step === 6 && (
          <ExperienceCalendar
            onScheduleChange={setFinalScheduleList}
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            defaultDateRange={defaultDateRange}
            today={today}
            tomorrow={tomorrow}
            finalScheduleList={finalScheduleList}
            setFinalScheduleList={setFinalScheduleList}
          />
        )}
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
          <button
            className="bg-black text-purewhite text-body-lg py-3 px-5 rounded-xl"
            onClick={handleSubmit}
            disabled={isPending || !isCurrentStepValid}
          >
            {isPending ? '처리중 …' : '완료하기'}
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
