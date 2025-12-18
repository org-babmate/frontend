'use client';

import { useParams } from 'next/navigation';

export interface ReservationState {
  scheduleId: string;
  experienceId: string;
  finalDate: string;
}
import { ExperienceDetailWidget } from '@/widget/experience-detail';

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  return <ExperienceDetailWidget experienceId={id} />;
}
