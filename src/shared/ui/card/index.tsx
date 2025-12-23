import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id: string;
  name: string;
  popBadge: string[];
  quotes: string;
  image: string;
}

function CustomHostCard({ id, name, popBadge, quotes, image }: CardProps) {
  return (
    <Link className="rounded-xl w-full overflow-hidden" href={`/host/profile/${id}`}>
      <div className="relative h-[400px]">
        <Image src={image} alt={'Card Image'} fill />
      </div>
      <div className="bg-gray-200 p-5 flex flex-col gap-3">
        <h1>{name}</h1>
        <div className="flex flex-row gap-1">
          {popBadge.map((value, index) => {
            return <span key={index}>{value}</span>;
          })}
        </div>
        <p>❝{quotes}❞</p>
      </div>
    </Link>
  );
}

export default CustomHostCard;
