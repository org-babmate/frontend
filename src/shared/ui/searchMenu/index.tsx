import { cn } from '@/shared/lib/utils';
import { Search } from 'lucide-react';

function SearchMenu({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'rounded-full bg-white flex justify-center items-center h-fit p-2 text-button-md',
        className,
      )}
    >
      <span className="px-5">Where?</span>
      <hr className="h-3 border-l bg-fill-gray-200 border-t-0 border-b-0 border-r-0 m-0" />
      <span className="px-5">Guests</span>
      <hr className="h-3 border-l bg-fill-gray-200 border-t-0 border-b-0 border-r-0 m-0" />
      <span className="px-5">Date</span>
      <button className="rounded-full bg-primary-normal text-white p-2">
        <Search className="size-4" />
      </button>
    </div>
  );
}

export default SearchMenu;
