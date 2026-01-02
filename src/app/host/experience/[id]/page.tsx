'use client';

import { useParams } from 'next/navigation';
import { ExperienceDetailWidget } from '@/widget/experience-detail';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

export interface ReservationState {
  scheduleId: string;
  experienceId: string;
  finalDate: string;
}

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <ExperienceDetailWidget experienceId={id} />;
}
