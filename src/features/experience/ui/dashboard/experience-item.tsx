import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { useRouter } from 'next/navigation';

type Status = 'Pending' | 'Accepted' | 'Cancelled' | 'Completed' | 'Declined';

interface ExperienceItemProp {
  id: string;
  experienceId: string;
  title: string;
  dateTime: string;
  image: string;
  description?: string;
  rejectClick?: (id: string) => void | Promise<void>;
  acceptClick?: (id: string) => void | Promise<void>;
  guestCancel?: (id: string) => void | Promise<void>;
  status?: Status;
  statusDescription?: string;
}

function ExperienceItem(props: ExperienceItemProp) {
  const {
    id: reservationId,
    experienceId,
    title,
    dateTime,
    description,
    image,
    status,
    statusDescription,
    rejectClick,
    acceptClick,
    guestCancel,
  } = props;

  const router = useRouter();

  const isHostActions = Boolean(rejectClick && acceptClick);
  const canRenderAction = Boolean(status); // status 없으면 버튼 영역 자체를 안 보여줌

  const goExperience = () => router.push(`/experience/${experienceId}`);

  const handleHostReject = async () => rejectClick?.(reservationId);
  const handleHostAccept = async () => acceptClick?.(reservationId);

  const handleGuestPrimary = async () => {
    if (!status) return;

    if (status === 'Pending') {
      await guestCancel?.(reservationId);
      return;
    }
    if (status === 'Completed') {
      router.push(`/review/${experienceId}/${reservationId}`);
      return;
    }
  };

  const getGuestButtonLabel = (s: Status) => {
    switch (s) {
      case 'Pending':
        return 'Cancel';
      case 'Cancelled':
        return 'Cancelled';
      case 'Declined':
        return 'Cancelled';
      case 'Completed':
        return 'Review';
      default:
        return s;
    }
  };

  const renderActionButton = () => {
    if (!canRenderAction || !status) return null;

    if (isHostActions) {
      if (status === 'Pending') {
        return (
          <div className="flex flex-row gap-1 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                void handleHostReject();
              }}
              className="flex-1 p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md"
            >
              Reject
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                void handleHostAccept();
              }}
              className="flex-1 p-3 rounded-lg bg-black text-white text-button-md"
            >
              Accept
            </button>
          </div>
        );
      }

      const isDisabled = status === 'Cancelled' || status === 'Declined';
      const label = status === 'Completed' ? 'Reviews' : status;

      return (
        <button
          className="p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md flex-1"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            if (status === 'Completed') router.push(`/review/${experienceId}/${reservationId}`);
          }}
        >
          {label}
        </button>
      );
    }

    const isDisabled = status === 'Cancelled';
    const label = getGuestButtonLabel(status);

    return (
      <button
        className="p-3 rounded-lg bg-gray-100 text-gray-500 text-button-md"
        disabled={isDisabled}
        onClick={(e) => {
          e.stopPropagation();
          void handleGuestPrimary();
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      {status && (
        <div className="flex flex-row gap-2 justify-start items-center mt-4 w-full text-start">
          <h3 className="text-body-xl text-gray-600">{status}</h3>
          <span className="text-caption-md text-black">{statusDescription}</span>
        </div>
      )}
      <div className="flex flex-row gap-6 py-4">
        <ImageWithFallback
          src={image !== '' ? image : '/a.jpg'}
          alt="experience image"
          width={100}
          height={100}
          className="rounded-xl bg-gray-50 size-[100px]"
          onClick={goExperience}
        />
        <div className="flex flex-col gap-[9px] text-body-lg flex-1">
          <button type="button" className="text-left" onClick={goExperience}>
            <h2 className="text-title-lg">{title}</h2>
            <p>{dateTime}</p>
            {description && <p className="text-caption-md">{description}</p>}
          </button>
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
