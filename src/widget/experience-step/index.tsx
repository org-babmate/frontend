'use client';

import { ScheduleLists } from '@/entities/experiences/model/types';
import {
  useRegisterExperienceMutation,
  useUpdateExperienceMutation,
} from '@/features/experience/model/manage-host-experience/queries';
import ExperienceCalendar from '@/features/experience/ui/experience-calendar';
import ExperienceCategories from '@/features/experience/ui/experience-categories';
import ParticipantCountInput from '@/features/experience/ui/experience-cost';
import ExperienceDescription from '@/features/experience/ui/experience-description';
import ExperienceLocation from '@/features/experience/ui/experience-location';
import ExperienceTitleInput from '@/features/experience/ui/experience-title';
import { CATEGORIES, CategoryValue } from '@/shared/data/categories';
import { SeoulLocation } from '@/shared/data/locations';
import { cn } from '@/shared/lib/utils';
import { Currency } from '@/shared/types/types';
import ModalDim from '@/shared/ui/modal-dim';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

type ValidationResult = {
  ok: boolean;
  message?: string;
};

export const MODE_OPTIONS = [
  { label: '1시간', value: 1 },
  { label: '2시간', value: 2 },
  { label: '3시간', value: 3 },
  { label: '4시간', value: 4 },
  { label: '5시간', value: 5 },
  { label: '6시간', value: 6 },
];

function ExperienceSteps({ isEdit, id }: { isEdit: boolean; id?: string }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

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
  const [meetupLocation, setMeetupLocation] = useState('meetingAreaDefault');
  const [meetingArea, setMeetingArea] = useState<SeoulLocation>('Hongdae');
  //COST&PARTICIPANT
  const [maxParticipant, setMaxParticipant] = useState<number | null>(null);
  const [minParticipant, setMinParticipant] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [price, setPrice] = useState(0);
  //DATES
  const [finalScheduleList, setFinalScheduleList] = useState<ScheduleLists[]>([]);
  const [durationHours, setDurationHours] = useState<number>(MODE_OPTIONS[0].value);

  //Modal
  const [showCreatingModal, setShowCreatingModal] = useState(false);

  const validators: Partial<Record<number, () => ValidationResult>> = {
    1: () =>
      selectedCategory.trim().length > 0
        ? { ok: true }
        : { ok: false, message: '카테고리를 선택해 주세요.' },

    2: () =>
      title.trim().length > 0 ? { ok: true } : { ok: false, message: '제목을 입력해 주세요.' },

    3: () =>
      description.trim().length > 0 && images.length > 0
        ? { ok: true }
        : { ok: false, message: '설명과 이미지를 최소 1개 이상 추가해 주세요.' },

    4: () => ({ ok: true }),

    5: () =>
      minParticipant !== null &&
      maxParticipant !== null &&
      minParticipant > 0 &&
      maxParticipant > minParticipant &&
      price > 0
        ? { ok: true }
        : {
            ok: false,
            message: '참가 인원과 가격을 올바르게 입력해 주세요.',
          },

    6: () =>
      finalScheduleList.length > 0
        ? { ok: true }
        : { ok: false, message: '최소 1개의 일정이 필요합니다.' },
  };

  function validateCurrentStep(step: number): boolean {
    const validator = validators[step];

    // validator 없으면 통과
    if (!validator) return true;

    const { ok, message } = validator();

    if (!ok && message) {
      toast.error(message);
    }

    return ok;
  }

  const isCurrentStepValid = validators[step]?.() ?? true;

  const {
    mutate: create,
    isError: createError,
    isPending: createPending,
    data: createData,
  } = useRegisterExperienceMutation(async (data) => {
    setShowCreatingModal(true);
    await sleep(1000);
    router.push(`/host/experience/${data.experienceDetail.id}`);
  });

  const {
    mutate: edit,
    isError: editError,
    isPending: editPending,
    data: editData,
  } = useUpdateExperienceMutation(async () => {});

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async () => {
    if (!validateCurrentStep(step)) return;
    if (isEdit && !!id) {
      await edit({
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
          meetingArea: meetingArea,
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
    } else {
      await create({
        imageFiles: images,
        folder: 'experiences',
        payload: {
          category: selectedCategory,
          title: title,
          description: description,
          videoUrl: '',
          photos: [],
          meetingPlace: meetupLocation,
          meetingArea: meetingArea,
          meetingPlaceLat: 0,
          meetingPlaceLng: 0,
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
    }
  };
  return (
    <div className="flex flex-col w-full pt-14 px-4">
      <div className="flex flex-row py-2.5 gap-1 px-1 items-center">
        <span
          className={cn(
            'ty-body-2-medium flex justify-center items-center size-6 ring ring-primary-normal rounded-full ',
            step > 1
              ? 'bg-primary-normal '
              : step === 1
                ? 'ring-primary-normal text-primary-normal'
                : 'text-label-subtle ring-label-subtle',
          )}
        >
          {step > 1 ? <Check className="size-4 text-white" /> : 1}
        </span>

        <hr className={cn('flex-1 border', step >= 1 && 'border-primary-normal')} />

        <span
          className={cn(
            'ty-body-2-medium flex justify-center items-center size-6 ring ring-primary-normal rounded-full ',
            step > 2
              ? 'bg-primary-normal '
              : step === 2
                ? 'ring-primary-normal text-primary-normal'
                : 'text-label-subtle ring-label-subtle',
          )}
        >
          {step > 2 ? <Check className="size-4 text-white" /> : 2}
        </span>

        <hr className={cn('flex-1 border', step >= 2 && 'border-primary-normal')} />

        <span
          className={cn(
            'ty-body-2-medium flex justify-center items-center size-6 ring ring-primary-normal rounded-full ',
            step > 3
              ? 'bg-primary-normal '
              : step === 3
                ? 'ring-primary-normal text-primary-normal'
                : 'text-label-subtle ring-label-subtle',
          )}
        >
          {step > 3 ? <Check className="size-4 text-white" /> : 3}
        </span>

        <hr className={cn('flex-1 border', step >= 3 && 'border-primary-normal')} />

        <span
          className={cn(
            'ty-body-2-medium flex justify-center items-center size-6 ring ring-primary-normal rounded-full ',
            step > 4
              ? 'bg-primary-normal '
              : step === 4
                ? 'ring-primary-normal text-primary-normal'
                : 'text-label-subtle ring-label-subtle',
          )}
        >
          {step > 4 ? <Check className="size-4 text-white" /> : 4}
        </span>

        <hr className={cn('flex-1 border', step >= 4 && 'border-primary-normal')} />

        <span
          className={cn(
            'ty-body-2-medium flex justify-center items-center size-6 ring ring-primary-normal rounded-full ',
            step > 5
              ? 'bg-primary-normal '
              : step === 5
                ? 'ring-primary-normal text-primary-normal'
                : 'text-label-subtle ring-label-subtle',
          )}
        >
          {step > 5 ? <Check className="size-4 text-white" /> : 5}
        </span>
      </div>
      <div className="flex-1 mt-4">
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
            meetingArea={meetingArea}
            setMeetingArea={setMeetingArea}
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
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            defaultDateRange={defaultDateRange}
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
            className="bg-black text-white text-body-lg py-3 px-5 rounded-xl"
            onClick={handleSubmit}
            disabled={createPending || !isCurrentStepValid || editPending}
          >
            {createPending || editPending ? '처리중 …' : '완료하기'}
          </button>
        ) : (
          <button
            className="bg-black text-white text-body-lg py-3 px-5 rounded-xl"
            onClick={() => {
              if (!validateCurrentStep(step)) return;
              setStep(step + 1);
            }}
            disabled={!isCurrentStepValid}
          >
            다음
          </button>
        )}
      </div>
      {showCreatingModal && (
        <ModalDim>
          <div className="text-body-md text-gray-900 bg-white p-10 rounded-2xl w-dvw h-dvh flex flex-col justify-center items-center">
            <Check className="size-24" />
            <span>체험이 만들어졌습니다</span>
          </div>
        </ModalDim>
      )}
    </div>
  );
}

export default ExperienceSteps;
