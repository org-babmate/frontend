'use client';

import { useRouter } from 'next/navigation';
import { useExperienceDetailQuery } from '@/entities/experiences/model/queries';
import { ExperienceHeader } from './experience-header';
import { ExperienceInfo } from './experience-info';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { GuestExperienceDetail } from '@/widget/experience-detail/ui/guest-experience-detail';
import Header from '@/shared/ui/header';
import { FullScreenSpinner } from '@/shared/ui/spinner';
import { useEffect, useState } from 'react';

function FullScreenError({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-white gap-4">
      <p className="text-gray-500">Failed to load experience details.</p>
      <button onClick={onBack} className="text-blue-500 hover:text-blue-700 font-medium">
        Go Back
      </button>
    </div>
  );
}

export function ExperienceDetailWidget({ experienceId }: { experienceId: string }) {
  const router = useRouter();
  const { mode } = useUserStore();
  const isHost = mode === 'hosts';
  const [step, setStep] = useState<'detail' | 'final'>('detail');
  const { data, isLoading, isError } = useExperienceDetailQuery(experienceId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [step]);

  if (isLoading) return <FullScreenSpinner />;
  if (isError || !data?.experienceDetail) return <FullScreenError onBack={() => router.back()} />;

  const { experienceDetail: experience, scheduleList } = data;

  return (
    <div className="bg-white pb-24 pt-14">
      <Header hasBack={step === 'final'} back={() => setStep('detail')} />
      {step === 'detail' && (
        <>
          <ExperienceHeader title={experience.title} photos={experience.photos || []} />
          <ExperienceInfo experience={experience} />
        </>
      )}
      {!isHost && (
        <GuestExperienceDetail
          experience={experience}
          schedules={scheduleList}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
}
export { FullScreenSpinner };
