import SearchMenu from '@/shared/ui/searchMenu';
import React from 'react';

function HeroSection() {
  return (
    <section className="relative h-[372px] bg-gray-400 w-screen -mx-4 md:-mx-60">
      <div className="absolute bottom-8 w-full flex justify-center">
        <SearchMenu />
      </div>
    </section>
  );
}

export default HeroSection;
