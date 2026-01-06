import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { Clock, MapPin, User } from 'lucide-react';

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  area: string;
  guestCount: number;
  duration: number;
  popbadge: string;
}

function ExperienceCard({
  id,
  image,
  title,
  description,
  area,
  guestCount,
  duration,
  popbadge,
}: Props) {
  return (
    // FIX SHADOW
    <div className="flex flex-col gap-3 bg-white shadow-md rounded-xl p-4">
      <div className="relative aspect-square w-full rounded-2xl">
        <ImageWithFallback alt={`experience-${id}`} src={image} fill className="rounded-2xl" />
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <span>{title}</span>
        <span className="text-white text-label-2-medium bg-primary-normal px-2 py-1 rounded-xl">
          {popbadge}
        </span>
      </div>
      <p className="text-label-1-regular">{description}</p>
      <div className="flex flex-row gap-1 text-label-2-medium text-label-subtle">
        <div className="flex flex-row gap-1 px-2 py-1 rounded-full ring ring-gray-200 items-center">
          <MapPin size={12} />
          {area}
        </div>
        <div className="flex flex-row gap-1 px-2 py-1 rounded-full ring ring-gray-200 items-center">
          <User size={12} />
          {`${guestCount} 인`}
        </div>
        <div className="flex flex-row gap-1 px-2 py-1 rounded-full ring ring-gray-200 items-center">
          <Clock size={12} />
          {`${duration}시간`}
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
