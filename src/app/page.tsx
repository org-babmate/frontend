'use client';

import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import HomeFeedSection from '@/widget/home-feed';

export default function Home() {
  const auth = useAuthStore((s) => s.accessToken);
  return (
    <div className="relative w-full">
      <HomeFeedSection />
    </div>
  );
}
