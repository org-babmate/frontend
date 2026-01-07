'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RoleSwitch } from '@/widget/role-switch';
import { useCallback, useMemo } from 'react';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useSseStore } from '@/processes/sse-session';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';

type Chunk = { token: string };

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
  const authed = useAuthStore((s) => s.authed);
  const authHydrated = useAuthStore((s) => s.hydrated);

  const mode = useUserStore((s) => s.mode);
  const roles = useUserStore((s) => s.roles);
  const name = useUserStore((s) => s.name);
  const userHydrated = useUserStore((s) => s.hydrated);

  // const readyUser = userHydrated;
  console.log('auth hydrate', authHydrated);

  // const authed = authHydrated ? authed : false;
  // const mode = readyUser ? mode : 'users';
  // const name = readyUser ? name : '';
  // const roles = readyUser ? roles : [];

  const resetKey = useSseStore((s) => s.resetKey);

  const { close } = useEventSource<Chunk>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled: authed,
    resetKey,
    withCredentials: true,
  });

  const { mutate: logout } = useLogout();

  const validHost = authed && roles && roles.length > 1;

  const myProfileHref = mode === 'hosts' ? '/host/profile' : '/my/profile';
  const dashboardOrBookingHref = mode === 'hosts' ? '/host/bookings' : '/my/bookings';
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
        <NavLink href="/host/profile/create">Become a Host</NavLink>
        <hr />
      </>
    );
  }, [authed, validHost]);

  const modeAction = useMemo(() => {
    if (mode === 'users' || !authed) {
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
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="px-5 pt-6.25 gap-0 overflow-y-scroll no-scrollbar">
        <SheetHeader className="w-full shrink-0 gap-4">
          <SheetClose asChild className="self-end">
            <X />
          </SheetClose>

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
                <NavLink href="/">Home</NavLink>
                <hr />
              </>
            )}

            <div className="flex flex-col w-full font-bold">
              <SectionLabel>My</SectionLabel>

              <AuthGuardLink href={myProfileHref} authed={authed} className="mt-4">
                Profile
              </AuthGuardLink>

              <AuthGuardLink href={dashboardOrBookingHref} authed={authed} className="mt-1">
                Booking
              </AuthGuardLink>

              <AuthGuardLink href={chatHref} authed={authed} className="mt-1">
                Message
              </AuthGuardLink>

              <AuthGuardLink href="/my/reviews" authed={authed} className="mt-1">
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
