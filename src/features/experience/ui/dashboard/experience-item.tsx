import Image from 'next/image';

interface ExperienceItemProp {
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  status?: string;
  statusDescription?: string;
}

function ExperienceItem({
  title,
  date,
  time,
  image,
  description,
  status,
  statusDescription,
}: ExperienceItemProp) {
  return (
    <>
      {status !== '' && (
        <div className="flex flex-row justify-center items-center mb-4">
          <h3 className="text-body-xl">{status}</h3>
          <span className="text-caption-md">{statusDescription}</span>
        </div>
      )}
      <div className="flex flex-row gap-6 py-5">
        <Image
          src={image !== '' ? image : '/a.jpg'}
          alt={'experice Image'}
          width={100}
          height={100}
          className="rounded-xl bg-gray-50 size-[100px]"
          placeholder="blur"
          blurDataURL="/a.jpg"
        ></Image>
        <div className="flex flex-col gap-[9px]">
          <h2 className="text-title-lg">{title}</h2>
          <p>{description}</p>
          <span className="text-body-lg">{`${date} / ${time}`}</span>
        </div>
      </div>
    </>
  );
}

export default ExperienceItem;
