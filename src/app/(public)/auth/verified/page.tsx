import VerifiedClient from '@/widget/verified-client';
import { Suspense } from 'react';

export default function VerifiedPage() {
  return (
    <Suspense fallback={null}>
      <VerifiedClient />
    </Suspense>
  );
}
