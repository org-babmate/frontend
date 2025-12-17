'use client';
import ExperienceCalendar from '@/features/experience/ui/experience-calendar';
import ExperienceCategories from '@/features/experience/ui/experience-categories';
import ParticipantCountInput from '@/features/experience/ui/experience-cost';
import ExperienceDescription from '@/features/experience/ui/experience-description';
import ExperienceLocation from '@/features/experience/ui/experience-location';
import ExperienceNameInput from '@/features/experience/ui/experience-name';
import { cn } from '@/shared/lib/utils';

import { useState } from 'react';

function ExperienceSteps() {
  //6steps
  const [step, setStep] = useState(6);
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-row mt-4 gap-1">
        <hr className={cn('flex-1 border', step >= 1 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 2 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 3 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 4 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 5 && 'border-black')} />
        <hr className={cn('flex-1 border', step >= 6 && 'border-black')} />
      </div>
      <div className="flex-1 mt-9">
        {step === 1 && <ExperienceCategories />}
        {step === 2 && <ExperienceNameInput />}
        {step === 3 && <ExperienceDescription value={images} onChange={setImages} maxFiles={8} />}
        {step === 4 && <ExperienceLocation />}
        {step === 5 && <ParticipantCountInput />}
        {step === 6 && <ExperienceCalendar />}
      </div>
      <div className="flex flex-row justify-between items-end w-full mb-[35px] px-2">
        <button
          onClick={() => setStep(step - 1)}
          className={cn(step > 1 ? 'visible' : 'invisible')}
          disabled={step <= 1}
        >
          이전
        </button>
        {step >= 6 ? (
          <button>저장</button>
        ) : (
          <button onClick={() => setStep(step + 1)}>다음</button>
        )}
      </div>
    </div>
  );
}

export default ExperienceSteps;
