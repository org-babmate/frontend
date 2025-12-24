'use client';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import CustomSheet from '@/widget/sheet';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
}

function Header({ title = 'Babmate' }: HeaderProps) {
  const { authed, hydrated } = useAuthStore();
  const showSignIn = hydrated && !authed;
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent w-full h-[52px]">
      <div className="flex w-full p-4 items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex flex-row items-center gap-5">
          {!hydrated ? (
            <div className="h-5 w-14 rounded bg-transparent" />
          ) : showSignIn ? (
            <Link href="/login" className="text-sm font-medium">
              Sign In
            </Link>
          ) : null}
          <CustomSheet />
        </div>
      </div>
    </header>
  );
}

export default Header;
