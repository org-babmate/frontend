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
    <div className="shadow-1 flex w-full flex-col rounded-xl bg-white" onClick={goExperience}>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="ty-body-2-semibold text-label">{title}</span>
        </div>
        <div className="ty-label-2-medium text-label-subtle flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1 rounded-full px-2 py-1 ring ring-gray-200">
            <MapPin size={12} />
            {area}
          </div>
          <div className="flex flex-row items-center gap-1 rounded-full px-2 py-1 ring ring-gray-200">
            <User size={12} />
            {`Max ${guestCount} people`}
          </div>
          <div className="flex flex-row items-center gap-1 rounded-full px-2 py-1 ring ring-gray-200">
            <Clock size={12} />
            {`${duration} hours`}
          </div>
        </div>
        <p className="ty-label-1-regular text-label-subtle">{description}</p>
        <span className="text-label text-[14px] leading-5 font-extrabold">
          {formatWithComma(price)}
        </span>
      </div>
      <div className="relative aspect-square w-full rounded-b-2xl">
        <ImageWithFallback alt={`experience-${id}`} src={image} fill className="rounded-b-2xl" />
        <span className="text-label-2-medium absolute top-4 left-4 rounded-xl bg-black/60 p-2 text-white backdrop-blur">
          {popbadge}
        </span>
      </div>
    </div>
  );
}

export default ExperienceCard;
