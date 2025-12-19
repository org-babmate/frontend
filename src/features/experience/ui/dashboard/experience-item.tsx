import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ExperienceItemProp {
  id: string;
  title: string;
  dateTime: string;
  image: string;
  description?: string;
  status?: string;
  statusDescription?: string;
}

function ExperienceItem({
  id,
  title,
  dateTime,
  description,
  image,
  status,
  statusDescription,
}: ExperienceItemProp) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/experience/${id}`)}>
      {status !== '' && (
        <div className="flex flex-row gap-2 justify-start items-center mt-4 w-full text-start">
          <h3 className="text-body-xl text-gray-600">{status}</h3>
          <span className="text-caption-md text-black">{statusDescription}</span>
        </div>
      )}
      <div className="flex flex-row gap-6 py-4">
        <Image
          src={image !== '' ? image : '/a.jpg'}
          alt={'experice Image'}
          width={100}
          height={100}
          className="rounded-xl bg-gray-50 size-[100px]"
          placeholder="blur"
          blurDataURL="/a.jpg"
        ></Image>
        <div className="flex flex-col gap-[9px] text-body-lg">
          <h2 className="text-title-lg">{title}</h2>
          <p>{dateTime}</p>
          {description && <p className="text-caption-md">{description}</p>}
          {status && (
            <button className="p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md">
              {status == 'pending' ? 'Cancel' : 'Review'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
