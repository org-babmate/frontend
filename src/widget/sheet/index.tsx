'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { useUserProfileQuery } from '@/features/user-profile/model/use-user-profile';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { RoleSwitch } from '@/widget/role-switch';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useRouter } from 'next/navigation';

type Chunk = { token: string };
type Lang = 'Eng' | 'Kor';
type Curr = 'USD' | 'KRW';

function hasHostRole(profile: any) {
  return Boolean(profile?.roles?.length && profile.roles.length > 1);
}

function Divider() {
  return <hr />;
}

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
  onNavigate, // setOpen(false) 주입
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  authed: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    onNavigate(); // ✅ 먼저 닫기 (항상 보장)
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
  const { mode, setUser } = useUserStore();
  const { data: profile } = useUserProfileQuery();
  const { authed } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>('Kor');
  const [currency, setCurrency] = useState<Curr>('KRW');

  const { close } = useEventSource<Chunk>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled: authed,
    withCredentials: true,
  });

  const { mutate: logout } = useLogout();

  const validHost = useMemo(() => authed && hasHostRole(profile), [authed, profile]);

  useEffect(() => {
    setUser({ isHost: Boolean(validHost), name: profile?.name });
  }, [setUser, validHost, profile?.name]);

  const myProfileHref = mode === 'hosts' ? '/host/profile' : '/my/profile';
  const dashboardOrBookingHref = mode === 'hosts' ? '/host/dashboard' : '/my/bookings';
  const dashboardOrBookingLabel = mode === 'hosts' ? 'Dashboard' : 'Booking';

  const handleLogout = useCallback(() => {
    close();
    logout();
  }, [close, logout]);

  const becomeHostCta = useMemo(() => {
    if (!authed) return null;
    if (validHost) return null;

    return (
      <>
        <NavLink href="/host">Become a Host</NavLink>
        <Divider />
      </>
    );
  }, [authed, validHost]);

  // mode에 따른 액션
  // - users: Discover는 authed일 때만 노출 (원하면 AuthGuardLink로 바꿔도 됨)
  // - hosts: Create new Experience 노출
  const modeAction = useMemo(() => {
    if (mode === 'users') {
      return (
        <>
          <NavLink href="/discover">Discover</NavLink>
          <Divider />
        </>
      );
    }
    return (
      <>
        <NavLink href="/experience/create">Create new Experience</NavLink>
        <Divider />
      </>
    );
  }, [mode, authed]);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-5 pt-[25px] gap-0 overflow-y-scroll no-scrollbar">
        <div className="flex flex-row gap-4 mb-4.5">
          <CustomDropDownRadio values={['Eng', 'Kor']} value={language} onChange={setLanguage} />
          <CustomDropDownRadio values={['USD', 'KRW']} value={currency} onChange={setCurrency} />
        </div>

        <SheetHeader className="w-full shrink-0">
          <SheetTitle>
            {authed && profile ? (
              <div className="flex flex-col gap-4">
                <div>{`Welcome ${profile.name}`}</div>
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
            <SheetClose asChild>
              <NavLink href="/">Home</NavLink>
            </SheetClose>
            <Divider />

            <div className="flex flex-col w-full font-bold">
              <SectionLabel>My</SectionLabel>

              <AuthGuardLink
                href="/my/profile"
                authed={authed}
                onNavigate={() => setOpen(false)}
                className="mt-4"
              >
                Profile
              </AuthGuardLink>

              <AuthGuardLink
                href={dashboardOrBookingHref}
                authed={authed}
                onNavigate={() => setOpen(false)}
                className="mt-1"
              >
                {dashboardOrBookingLabel}
              </AuthGuardLink>

              <AuthGuardLink
                href="/chat"
                authed={authed}
                onNavigate={() => setOpen(false)}
                className="mt-1"
              >
                Message
              </AuthGuardLink>

              <AuthGuardLink
                href="/my/reviews"
                authed={authed}
                onNavigate={() => setOpen(false)}
                className="mt-1"
              >
                Review
              </AuthGuardLink>

              <NavLink href="/" className="mt-1">
                Setting
              </NavLink>
            </div>

            <Divider />

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

            {authed && (
              <div className="flex flex-col gap-5 w-full">
                <Divider />
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
