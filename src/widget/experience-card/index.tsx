import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { Clock, MapPin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  area: string;
  guestCount: number;
  duration: number;
  price: number;
  popbadge: string;
}

function ExperienceCard({
  id,
  image,
  title,
  description,
  area = '서울역',
  guestCount,
  duration,
  price,
  popbadge = '☸︎☸︎ Hidden Gems',
}: Props) {
  const router = useRouter();
  const goExperience = () => router.push(`/experience/${id}`);

  function formatWithComma(value: number): string {
    if (Number.isNaN(value)) return '';
    return `₩ ${Math.trunc(value).toLocaleString('ko-KR')}`;
  }

  return (
    <div className="flex flex-col bg-white shadow-1 rounded-xl w-full" onClick={goExperience}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-row w-full justify-between items-center">
          <span className="ty-body-2-semibold text-label">{title}</span>
        </div>
        <div className="flex flex-row gap-1 ty-label-2-medium text-label-subtle">
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
        <p className="ty-label-1-regular text-label-subtle">{description}</p>
        <span className="text-label  font-extrabold text-[14px] leading-5">
          {formatWithComma(price)}
        </span>
      </div>
      <div className="relative aspect-square w-full rounded-b-2xl">
        <ImageWithFallback alt={`experience-${id}`} src={image} fill className="rounded-b-2xl" />
        <span className="absolute top-4 left-4 text-white text-label-2-medium bg-black/60  p-2 rounded-xl backdrop-blur">
          {popbadge}
        </span>
      </div>
    </div>
  );
}

export default ExperienceCard;
