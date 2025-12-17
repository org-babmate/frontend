'use client';

import { useParams } from 'next/navigation';
import { ExperienceDetailWidget } from '@/widget/experience-detail';

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <ExperienceDetailWidget experienceId={id} />;
}
