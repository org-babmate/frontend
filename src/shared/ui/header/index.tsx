import CustomSheet from '@/widget/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, X } from 'lucide-react';

interface HeaderProp {
  hasBack?: boolean;
  title?: string;
  hasClose?: boolean;
}

function Header({ hasBack = false, title = '', hasClose = false }: HeaderProp) {
  const logoHeader = !hasBack && !hasClose;
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full h-13 bg-white">
      {logoHeader ? (
        <div className="flex w-full p-4 items-center justify-between">
          <Link href={'/'} className="w-26.75 h-5 relative">
            <Image alt="logo" src="/logos/babmate-logo.svg" fill className="object-cover" />
          </Link>
          <div className="flex flex-row items-center gap-5">
            <CustomSheet />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4">
          <div className="w-6">
            <ChevronLeft
              size={24}
              className={hasBack ? 'visible' : 'invisible pointer-events-none'}
            />
          </div>
          <span className={title ? 'visible' : 'invisible pointer-events-none'}>
            {title || 'placeholder'}
          </span>
          <div className="w-6">
            <X className={hasClose ? 'visible' : 'invisible pointer-events-none'} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
