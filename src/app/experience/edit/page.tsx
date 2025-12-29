'use client';

import ExperienceSteps from '@/widget/experience-step';
import { useParams } from 'next/navigation';

function ExperienceEditPage() {
  const params = useParams();
  const id = params.id as string;
  return <ExperienceSteps isEdit={true} id={id} />;
}

export default ExperienceEditPage;
