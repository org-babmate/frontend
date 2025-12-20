'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { useUserProfileQuery } from '@/features/user-profile/model/use-user-profile';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { RoleSwitch } from '@/widget/role-switch';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { useMemo, useState } from 'react';
import { useLogout } from '@/features/auth/login/model/use-login-form';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

type Chunk = { token: string };

function CustomSheet() {
  const { accessToken } = useAuthStore();
  const { mode } = useUserStore();
  const { data: profile, isLoading } = useUserProfileQuery();
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'Eng' | 'Kor'>('Kor');
  const [currency, setCurrency] = useState<'USD' | 'KRW'>('KRW');
  const enabled = useMemo(() => Boolean(accessToken), [accessToken]);

  const { state, close } = useEventSource<Chunk>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled,
    withCredentials: true,
    onMessage: (chunk) => setText((prev) => prev + chunk.token),
  });
  const { mutate } = useLogout();

  const validHost = profile && profile.roles && profile.roles.length > 1;
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-5 pt-[25px] gap-0 overflow-y-scroll no-scrollbar">
        <>
          <div className="flex flex-row gap-4 mb-4.5">
            <CustomDropDownRadio values={['Eng', 'Kor']} value={'Eng'} onChange={setLanguage} />
            <CustomDropDownRadio values={['USD', 'KRW']} value={'KRW'} onChange={setCurrency} />
          </div>
          <SheetHeader className="w-full shrink-0">
            <SheetTitle>
              {accessToken && profile ? (
                `Welcome ${profile?.name}`
              ) : (
                <div className="w-full flex flex-row justify-between gap-3 mb-10">
                  <Link
                    href="/login"
                    className="text-black bg-gray-200 flex-1 py-2 rounded-md text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-black text-white flex-1 py-2 rounded-md text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {validHost && (
                <div className="flex w-full mt-5">
                  <RoleSwitch />
                </div>
              )}
            </SheetTitle>
          </SheetHeader>
          <section className="flex flex-col mt-7.5 gap-5 flex-1 mb-7.5">
            <div className="flex flex-col gap-5 w-full font-bold">
              <Link href={'/'} className="w-full py-2.5">
                Home
              </Link>
              <hr />
              <div className="flex flex-col w-full font-bold">
                <span className="text-sm text-gray-300">My</span>
                <Link
                  href={mode === 'hosts' ? '/host/profile' : '/my/profile'}
                  className="w-full py-2.5 mt-4"
                >
                  Profile
                </Link>
                <Link href={'/my/bookings'} className="w-full py-2.5 mt-1">
                  Booking
                </Link>
                <Link href={'/chat'} className="w-full py-2.5 mt-1">
                  Message
                </Link>
                <Link href={'/my/reviews'} className="w-full py-2.5 mt-1">
                  Review
                </Link>
                <Link href={'/'} className="w-full py-2.5 mt-1">
                  Setting
                </Link>
              </div>
              <hr />
              {!validHost && (
                <>
                  <Link href={'/host'} className="w-full py-2.5">
                    Become a Host
                  </Link>
                  <hr />
                </>
              )}
              {mode == 'users' ? (
                <>
                  <Link href={'/discover'} className="w-full py-2.5">
                    Discover
                  </Link>
                  <hr />
                </>
              ) : (
                <>
                  <Link href={'/experience/create'} className="w-full py-2.5">
                    Create new Experience
                  </Link>
                  <hr />
                </>
              )}
              <div className="flex flex-col w-full font-bold">
                <span className="text-sm text-gray-300">Help</span>
                <Link href={'/'} className="w-full py-2.5 mt-4">
                  FAQ
                </Link>
                <Link href={'/'} className="w-full py-2.5 mt-1">
                  Contact Us
                </Link>
              </div>
              {accessToken && (
                <div className="flex flex-col gap-5 w-full">
                  <hr />
                  <button onClick={() => (close(), mutate())} className="w-full py-2.5 text-start">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      </SheetContent>
    </Sheet>
  );
}

export default CustomSheet;
