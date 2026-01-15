import HostMain from '@/features/host/ui/host-main';
import Header from '@/shared/ui/header';
import { useRouter } from 'next/navigation';

export default function Host() {
  const router = useRouter();
  return (
    <>
      <Header hasBack={true} back={() => router.back()} />
      <HostMain />
    </>
  );
}
