'use client';

import CustomSheet from '@/widget/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, X } from 'lucide-react';
import { useScrollDirection } from '@/shared/ui/header/scroll-header';
import { useRouter } from 'next/navigation';

interface HeaderProp {
  hasBack?: boolean;
  title?: string;
  hasClose?: boolean;
}

function Header({ hasBack = false, title = '', hasClose = false }: HeaderProp) {
  const logoHeader = !hasBack;
  const showHeader = useScrollDirection();
  const router = useRouter();
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 w-full h-14 bg-white
        transition-transform duration-300 ease-out
        ${showHeader ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {logoHeader ? (
        <div className="flex w-full p-4 items-center justify-between">
          <Link href="/" className="w-26.75 h-5 relative">
            <Image alt="logo" src="/logos/babmate-logo.svg" fill className="object-cover" />
          </Link>
          <div className="flex flex-row items-center gap-5">
            <CustomSheet />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4">
          <div
            className="w-6"
            onClick={hasBack ? () => router.back() : undefined}
            aria-label="뒤로 가기"
          >
            <ChevronLeft
              size={24}
              className={hasBack ? 'visible' : 'invisible pointer-events-none'}
            />
          </div>
          <span className={title ? 'visible' : 'invisible pointer-events-none'}>{title || ''}</span>
          <div className="flex flex-row items-center gap-5">
            <CustomSheet />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
