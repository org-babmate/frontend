import { Search } from 'lucide-react';
import React from 'react';

function SearchMenu() {
  return (
    <div className="rounded-full bg-white flex justify-center items-center gap-5 h-fit py-[9px] pl-7 pr-4 w-[310px]">
      <span>Where?</span>
      <hr className="h-3 border-l border-black/40 border-t-0 border-b-0 border-r-0 m-0" />
      <span>Guests</span>
      <hr className="h-3 border-l border-black/40 border-t-0 border-b-0 border-r-0 m-0" />
      <span>Date</span>
      <button className="rounded-full bg-black text-white p-2">
        <Search className="size-4" />
      </button>
    </div>
  );
}

export default SearchMenu;
