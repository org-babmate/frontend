'use client';

import { useMyHostProfileQuery } from '@/features/host/model/use-host-mutation';
import HostProfileView from '@/widget/host-profile';
function MyHostProfilePage() {
  const query = useMyHostProfileQuery();
  return <HostProfileView query={query} />;
}

export default MyHostProfilePage;
