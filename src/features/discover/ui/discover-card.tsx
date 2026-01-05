import { Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../../../shared/ui/image-with-fallback';

interface DiscoverCardProps {
  image: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  badgeText?: string;
}

export function DiscoverCard({
  image,
  title,
  price,
  duration,
  location,
  badgeText = 'Snack attack',
}: DiscoverCardProps) {
  return (
    <div className="flex flex-col items-start p-0 w-full max-w-[1440px] h-[380px] rounded-[12px] overflow-hidden">
      <div className="relative w-full h-[226px] bg-[#EAEBEF]">
        <div className="absolute inset-0">
          <ImageWithFallback src={image} alt={title} fill />
        </div>
        <div className="absolute left-[20px] top-[20px] flex flex-row justify-center items-center px-[16px] py-[8px] gap-[10px] bg-[#020202] rounded-[100px]">
          <span className="font-medium text-[12px] leading-[120%] text-white whitespace-nowrap">
            {badgeText}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start p-[20px] gap-[8px] w-full h-[154px] bg-[#F3F3F5]">
        <h3 className="w-full h-[24px] font-semibold text-[16px] leading-[150%] text-[#020202] truncate">
          {title}
        </h3>
        <div className="flex flex-row items-center gap-[4px] h-[24px]">
          <span className="font-semibold text-[16px] leading-[150%] text-[#020202]">${price}</span>
          <span className="font-normal text-[14px] leading-[160%] text-[#020202]">/</span>
          <span className="font-normal text-[14px] leading-[160%] text-[#020202]">guest</span>
        </div>
        <div className="flex flex-row items-center gap-[4px] h-[21px]">
          <Clock className="w-[16px] h-[16px] text-[#020202]" />
          <span className="font-normal text-[13px] leading-[160%] text-[#020202]">{duration}</span>
        </div>
        <div className="flex flex-row items-center gap-[4px] h-[21px]">
          <MapPin className="w-[16px] h-[16px] text-[#020202]" />
          <span className="font-normal text-[13px] leading-[160%] text-[#020202]">{location}</span>
        </div>
      </div>
    </div>
  );
}
