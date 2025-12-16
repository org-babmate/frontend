'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { useUserProfileQuery } from '@/features/user-profile/model/use-user-profile';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/shared/ui/switch';
import { RoleSwitch } from '@/widget/role-switch';
import { useState } from 'react';

function CustomSheet() {
  const { accessToken } = useAuthStore();
  const { data: profile, isLoading } = useUserProfileQuery();
  const validHost = profile && profile.roles.length > 1;

  //호스트 등록 확인
  //로그인 확인
  const [role, setRole] = useState(false); // false = Guest, true = Host

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-5 pt-[25px]">
        <>
          <div className="flex flex-row gap-4">
            <CustomDropDownRadio defaultValue={'Eng'} values={['Eng', 'Kor']} />
            <CustomDropDownRadio defaultValue={'USD'} values={['USD', 'KRW']} />
          </div>
          <SheetHeader className="w-full">
            <SheetTitle>
              {accessToken && profile ? (
                `Welcome ${profile?.name}`
              ) : (
                <div className="w-full flex flex-row justify-between gap-3">
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
              {profile && <Switch />}
              <RoleSwitch />
            </SheetTitle>
          </SheetHeader>
          <section className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full font-bold">
              <Link href={'/'} className="w-full py-2.5">
                Home
              </Link>
              <hr />
              <Link href={'/discover'} className="w-full py-2.5">
                Discover
              </Link>
              <hr />
              {validHost && (
                <>
                  <Link href={'/'} className="w-full py-2.5">
                    Become a Host
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
                  <Link href={'/'} className="w-full py-2.5">
                    Log Out
                  </Link>
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
