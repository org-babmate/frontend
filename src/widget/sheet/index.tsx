'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { RoleSwitch } from '@/widget/role-switch';
import { useCallback, useMemo, useState } from 'react';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useRouter } from 'next/navigation';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { useSseStore } from '@/processes/sse-session';

type Chunk = { token: string };
type Lang = 'Eng' | 'Kor';
type Curr = 'USD' | 'KRW';

function SectionLabel({ children }: { children: string }) {
  return <span className="text-sm text-gray-300">{children}</span>;
}

function NavLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SheetClose asChild>
      <Link href={href} className={`w-full py-2.5 ${className}`}>
        {children}
      </Link>
    </SheetClose>
  );
}

function AuthGuardLink({
  href,
  children,
  authed,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  authed: boolean;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (authed) return;
    e.preventDefault();
    router.push(`/login?redirect=${encodeURIComponent(href)}`);
  };

  return (
    <Link href={href} onClick={handleClick} className={`w-full py-2.5 ${className}`}>
      {children}
    </Link>
  );
}

export default function CustomSheet() {
  const { mode, roles, name, hydrated: userHydrated } = useUserStore();
  const { authed, hydrated: authHydrated } = useAuthStore();

  // ✅ hydration 완료 여부
  const ready = userHydrated && authHydrated;

  // ✅ hydration 전에는 SSR과 동일하도록 “고정값” 사용
  const stableAuthed = ready ? authed : false;
  const stableMode = ready ? mode : 'users';
  const stableName = ready ? name : '';
  const stableRoles = ready ? roles : [];

  const [language, setLanguage] = useState<Lang>('Kor');
  const [currency, setCurrency] = useState<Curr>('KRW');

  const resetKey = useSseStore((s) => s.resetKey);

  // ✅ enabled도 stableAuthed로 맞춰야 hydration 타이밍에 불필요한 리렌더/상태변화가 줄어듦
  const { close } = useEventSource<Chunk>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled: stableAuthed,
    resetKey,
    withCredentials: true,
  });

  const { mutate: logout } = useLogout();

  const validHost = stableAuthed && stableRoles && stableRoles.length > 1;

  const myProfileHref = stableMode === 'hosts' ? '/host/profile' : '/my/profile';
  const dashboardOrBookingHref = stableMode === 'hosts' ? '/host/bookings' : '/my/bookings';
  const chatHref = stableMode === 'hosts' ? '/host/chat' : '/chat';

  const handleLogout = useCallback(() => {
    close();
    logout();
  }, [close, logout]);

  // ✅ memo도 stable 값만 사용
  const becomeHostCta = useMemo(() => {
    if (!stableAuthed) return null;
    if (validHost) return null;
    return (
      <>
        <NavLink href="/host/profile/create">Become a Host</NavLink>
        <hr />
      </>
    );
  }, [stableAuthed, validHost]);

  const modeAction = useMemo(() => {
    if (stableMode === 'users' || !stableAuthed) {
      return (
        <>
          <NavLink href="/discover">Discover</NavLink>
          <hr />
        </>
      );
    }
    return (
      <>
        <NavLink href="/host/experience/create">Create new Experience</NavLink>
        <hr />
      </>
    );
  }, [stableMode, stableAuthed]);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent side="right" className="px-5 pt-6.25 gap-0 overflow-y-scroll no-scrollbar">
        <SheetHeader className="w-full shrink-0 gap-4">
          <SheetClose asChild className="self-end">
            <X />
          </SheetClose>

          <SheetTitle>
            {stableAuthed ? (
              <div className="flex flex-col gap-4">
                <div>{`Welcome ${stableName}`}</div>
                {validHost && (
                  <div className="flex w-full">
                    <RoleSwitch />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-row justify-between gap-3 mb-10">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="text-black bg-gray-200 flex-1 py-2 rounded-md text-center"
                  >
                    Log In
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/signup"
                    className="bg-black text-white flex-1 py-2 rounded-md text-center"
                  >
                    Sign Up
                  </Link>
                </SheetClose>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        <section className="flex flex-col mt-7.5 gap-5 flex-1 mb-7.5">
          <div className="flex flex-col gap-5 w-full font-bold">
            {stableMode === 'users' && (
              <>
                {/* ✅ NavLink 자체가 SheetClose를 포함하므로 중복 래핑 제거 */}
                <NavLink href="/">Home</NavLink>
                <hr />
              </>
            )}

            <div className="flex flex-col w-full font-bold">
              <SectionLabel>My</SectionLabel>

              <AuthGuardLink href={myProfileHref} authed={stableAuthed} className="mt-4">
                Profile
              </AuthGuardLink>

              <AuthGuardLink href={dashboardOrBookingHref} authed={stableAuthed} className="mt-1">
                Booking
              </AuthGuardLink>

              <AuthGuardLink href={chatHref} authed={stableAuthed} className="mt-1">
                Message
              </AuthGuardLink>

              <AuthGuardLink href="/my/reviews" authed={stableAuthed} className="mt-1">
                Review
              </AuthGuardLink>

              <NavLink href="/" className="mt-1">
                Setting
              </NavLink>
            </div>

            <hr />

            {becomeHostCta}
            {modeAction}

            <div className="flex flex-col w-full font-bold">
              <SectionLabel>Help</SectionLabel>

              <NavLink href="/" className="mt-4">
                FAQ
              </NavLink>

              <NavLink href="/" className="mt-1">
                Contact Us
              </NavLink>
            </div>

            {stableAuthed && (
              <div className="flex flex-col gap-5 w-full">
                <hr />
                <button onClick={handleLogout} className="w-full py-2.5 text-start">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
