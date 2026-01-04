import { getPopbadgeDisplay, PopbadgeName } from '@/shared/data/popbadges';
import Badge from '@/shared/ui/badge';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
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
      className="rounded-xl w-full overflow-hidden p-4 flex flex-col gap-4 bg-white"
      href={`/hosts/profile/${id}`}
    >
      <div className="relative rounded-lg w-full h-92.75">
        <Image src={image} alt={'Card Image'} fill />
      </div>
      <div className=" p-5 flex flex-col gap-3">
        <h1 className="mb-1">{name}</h1>
        <div className="flex flex-row gap-1 mb-3">
          {popBadge.map((value, index) => {
            return <Badge key={index} content={getPopbadgeDisplay(value)}></Badge>;
          })}
        </div>
        <p>{quotes}</p>
        <div className="w-full flex flex-rorw justify-between">
          <span>Experience Name</span>
          <div className="size-8 ring ring-gray-100 flex justify-center items-center rounded-full">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CustomHostCard;
