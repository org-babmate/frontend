import CustomSheet from '@/widget/sheet';
import Link from 'next/link';

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent w-full">
      <div className="flex w-full pt-5 pb-2 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Babmate</h1>
        <div className="flex flex-row items-center gap-5">
          <Link href="/login" className="text-sm font-medium">
            Sign In
          </Link>
          <CustomSheet />
        </div>
      </div>
    </header>
  );
}

export default Header;
