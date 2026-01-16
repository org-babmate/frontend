import { BookingStaus } from '@/entities/bookings/model/types';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import { useRouter } from 'next/navigation';

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
  status?: BookingStaus;
  statusDescription?: string;
}

export const BOOKING_STATUS_CLASS: Record<BookingStaus, string> = {
  Pending: 'text-primary-normal',
  Accepted: 'text-[#02AE4C]',
  Completed: 'text-label-subtle',
  Cancelled: 'text-label-red',
  Declined: 'text-label-red',
};

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

  const getGuestButtonLabel = (s: BookingStaus) => {
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
          <div className="flex w-full flex-row gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                void handleHostReject();
              }}
              className="text-button-md flex-1 rounded-lg bg-gray-100 p-3 text-gray-500"
            >
              Reject
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                void handleHostAccept();
              }}
              className="text-button-md flex-1 rounded-lg bg-black p-3 text-white"
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
          className="text-button-md flex-1 rounded-lg bg-gray-100 p-3 text-gray-500"
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
        className="text-button-md rounded-lg bg-gray-100 p-3 text-gray-500"
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
    <div className="rounded-5 bg-white">
      {status && (
        <div className="mt-4 flex w-full flex-row items-center justify-start gap-2 text-start">
          <h3 className={BOOKING_STATUS_CLASS[status]}>{status}</h3>
          <span className="text-caption-md text-black">{statusDescription}</span>
        </div>
      )}
      <div className="mt-1 flex flex-row gap-6">
        <ImageWithFallback
          src={image !== '' ? image : '/a.jpg'}
          alt="experience image"
          width={100}
          height={100}
          className="size-25 rounded-xl bg-gray-50"
          onClick={goExperience}
        />
        <div className="text-body-lg flex flex-1 flex-col justify-center gap-2.25">
          <button type="button" className="text-left" onClick={goExperience}>
            <h2 className="text-title-lg">{title}</h2>
            <p className="ty-label-1-medium">{dateTime}</p>
            {description && <p className="ty-label-1-medium line-clamp-2">{description}</p>}
          </button>
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
