import Image from 'next/image';

interface CardProps {
  name: string;
  popBadge: string[];
  quotes: string;
  image: string;
}

function CustomHostCard({ name, popBadge, quotes, image }: CardProps) {
  return (
    <div className="rounded-xl w-full overflow-hidden">
      <div className="relative h-[400px]">
        <Image src={image} alt={'Card Image'} fill />
      </div>
      <div className="bg-gray-200 p-5 flex flex-col gap-3">
        <h1>Minsu</h1>
        <div className="flex flex-row gap-1">
          {popBadge.map((value, index) => {
            return <span key={index}>{value}</span>;
          })}
        </div>
        <p>❝ Bold flavors, bold friendships ❞</p>
      </div>
    </div>
  );
}

export default CustomHostCard;
