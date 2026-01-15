import HostMain from '@/features/host/ui/host-main';
import Header from '@/shared/ui/header';

export default function Host() {
  return (
    <>
      <Header hasBack={true} />
      <HostMain />
    </>
  );
}
