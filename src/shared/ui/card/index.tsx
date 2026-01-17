import { getPopbadgeDisplay, PopbadgeName } from '@/shared/data/popbadges';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import PopBadge from '@/shared/ui/popbadge';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CardProps {
  id: string;
  name: string;
  popBadge: PopbadgeName[];
  quotes: string;
  image: string;
}

function CustomHostCard({ id, name, popBadge, quotes, image }: CardProps) {
  return (
    <Link
      className="rounded-xl w-full overflow-hidden flex flex-col bg-white text-label ring ring-gray-200"
      href={`/hosts/profile/${id}`}
    >
      <div className="relative rounded-lg w-full h-92.75">
        <ImageWithFallback src={image} alt={'Card Image'} fill />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h1 className="ty-heading-3">{name}</h1>
          <div className="flex flex-row gap-1">
            {popBadge.map((value, index) => {
              return <PopBadge key={index} content={getPopbadgeDisplay(value)}></PopBadge>;
            })}
          </div>
        </div>
        <p className="ty-label-1-regular text-label-subtle whitespace-nowrap truncate">{quotes}</p>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="ty-label-1-semibold ">Experience Name</span>
          <div className="size-8 ring ring-gray-100 flex justify-center items-center rounded-full">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CustomHostCard;
