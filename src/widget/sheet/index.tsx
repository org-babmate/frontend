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
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { RoleSwitch } from '@/widget/role-switch';
import { useCallback, useMemo, useState } from 'react';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useRouter } from 'next/navigation';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';

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
    onNavigate();
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
  const { mode, setUser, roles, name } = useUserStore();
  const { authed } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>('Kor');
  const [currency, setCurrency] = useState<Curr>('KRW');

  const { state, close } = useEventSource<Chunk>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled: authed,
    withCredentials: true,
  });

  console.log(state);

  const { mutate: logout } = useLogout();

  const validHost = authed && roles && roles.length > 1;

  const myProfileHref = mode === 'hosts' ? '/host/profile' : '/my/profile';
  const dashboardOrBookingHref = mode === 'hosts' ? '/host/dashboard' : '/my/bookings';
  const chatHref = mode === 'hosts' ? '/host/chat' : '/chat';

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
        <hr />
      </>
    );
  }, [authed, validHost]);

  const modeAction = useMemo(() => {
    if (mode === 'users') {
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
  }, [mode, authed]);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-5 pt-6.25 gap-0 overflow-y-scroll no-scrollbar">
        <div className="flex flex-row gap-4 mb-4.5">
          <CustomDropDownRadio values={['Eng', 'Kor']} value={language} onChange={setLanguage} />
          <CustomDropDownRadio values={['USD', 'KRW']} value={currency} onChange={setCurrency} />
        </div>

        <SheetHeader className="w-full shrink-0">
          <SheetTitle>
            {authed ? (
              <div className="flex flex-col gap-4">
                <div>{`Welcome ${name}`}</div>
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
            {mode === 'users' && (
              <>
                <SheetClose asChild>
                  <NavLink href="/">Home</NavLink>
                </SheetClose>
                <hr />
              </>
            )}

            <div className="flex flex-col w-full font-bold">
              <SectionLabel>My</SectionLabel>

              <AuthGuardLink
                href={myProfileHref}
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
                Booking
              </AuthGuardLink>

              <AuthGuardLink
                href={chatHref}
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

            {authed && (
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
