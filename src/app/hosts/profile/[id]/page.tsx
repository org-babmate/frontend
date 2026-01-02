'use client';

import { useHostProfileQuery } from '@/features/host/model/host-profile-queries';
import HostProfileView from '@/widget/host-profile';
import { useParams } from 'next/navigation';

function MyHostProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const query = useHostProfileQuery(id);
  return <HostProfileView query={query} />;
}

export default MyHostProfilePage;
