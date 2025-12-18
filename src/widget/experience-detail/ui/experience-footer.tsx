'use client';

interface ExperienceFooterProps {
  price: number;
}

export function ExperienceFooter({ price }: ExperienceFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EAEBEF] flex justify-between items-start px-5 pt-5 pb-8 z-50">
      <div className="flex flex-col gap-1">
        <span className="text-[17px] font-semibold leading-[20px] text-black">
          {price} / guest
        </span>
        <span className="text-[10px] font-normal leading-[16px] text-[#4B4B4B]">
          No charge until host accepts
        </span>
      </div>
      <button className="flex justify-center items-center w-[163.5px] h-[40px] px-[12px] py-[10px] bg-[#020202] rounded-lg gap-[10px]">
        <span className="text-white text-[14px] font-semibold leading-[16px]">
          Show Availability
        </span>
      </button>
    </div>
  );
}
