import { Clock, MapPin, User } from 'lucide-react';
import { ImageWithFallback } from '../../../shared/ui/image-with-fallback';
import { getCategoryLabel } from '@/shared/data/categories';

interface DiscoverCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  duration: number;
  guestCount: number;
  description: string;
  location: string;
  badgeText?: string;
}

export function DiscoverCard({
  id,
  image,
  title,
  price,
  duration,
  guestCount,
  location,
  description,
  badgeText = 'Snack attack',
}: DiscoverCardProps) {
  return (
    // FIX SHADOW
    <div className="flex flex-col bg-white shadow-md rounded-xl">
      <div className="relative aspect-square w-full">
        <ImageWithFallback alt={`experience-${id}`} src={image} fill className="rounded-2xl" />
        <span className="absolute left-4 top-4 text-white text-label-2-medium bg-primary-normal p-2 rounded-full">
          {getCategoryLabel(badgeText)}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-row w-full justify-between items-center">
          <span className="text-body-1-semibold text-label">{title}</span>
        </div>
        <p className="text-label-1-regular whitespace-break-spaces truncate">{description}</p>
        <div className="flex flex-row gap-1 text-label-2-medium text-label-subtle">
          <div className="flex flex-row gap-1 px-2 py-1 rounded-full ring ring-gray-200 items-center">
            <MapPin size={12} />
            {location}
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
    </div>
  );
}
