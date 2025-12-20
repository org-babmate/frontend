import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ExperienceItemProp {
  id: string;
  experienceId: string;
  title: string;
  dateTime: string;
  image: string;
  description?: string;
  rejectClick?: (id: string) => void;
  acceptClick?: (id: string) => void;
  guestCancel?: (id: string) => void;
  status?: 'Pending' | 'Accepted' | 'Cancelled' | 'Completed';
  statusDescription?: string;
}

function ExperienceItem({
  id,
  experienceId,
  title,
  dateTime,
  description,
  image,
  status,
  rejectClick,
  acceptClick,
  guestCancel,
  statusDescription,
}: ExperienceItemProp) {
  const router = useRouter();
  return (
    <div>
      {status && (
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
        <div className="flex flex-col gap-[9px] text-body-lg flex-1">
          <div
            className="flex flex-col gap-[9px] text-body-lg"
            onClick={() => router.push(`/experience/${id}`)}
          >
            <h2 className="text-title-lg">{title}</h2>
            <p>{dateTime}</p>
            {description && <p className="text-caption-md">{description}</p>}
          </div>
          {rejectClick && acceptClick ? (
            <div className="flex flex-row gap-1 w-full">
              {status === 'Pending' ? (
                <>
                  <button
                    onClick={() => rejectClick(id)}
                    className="flex-1 p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => acceptClick(id)}
                    className="flex-1 p-3 rounded-lg bg-black text-white text-button-md"
                  >
                    Accept
                  </button>
                </>
              ) : (
                <button
                  className="p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md flex-1"
                  disabled={status === 'Cancelled'}
                  onClick={async () => {
                    if (status === 'Completed') {
                      router.push(`/experience/${experienceId}/review`);
                    }
                  }}
                >
                  {status}
                </button>
              )}
            </div>
          ) : (
            status && (
              <button
                className="p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md"
                onClick={async () => {
                  if (status === 'Pending' && guestCancel) {
                    await guestCancel(id);
                    return;
                  }
                  router.push(`/experience/${experienceId}/review`);
                }}
                disabled={status === 'Cancelled'}
              >
                {status === 'Pending' ? 'Cancel' : status === 'Cancelled' ? 'Cancelled' : 'Review'}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
