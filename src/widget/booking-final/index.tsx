import { useRegisterBookingMutation } from '@/features/bookings/model/booking-queries';
import { Currency } from '@/shared/types/types';
import ModalDim from '@/shared/ui/modal-dim';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface BookingFinal {
  title: string;
  description: string;
  image: string;
  currency: Currency;
  guestCount: number;
  finalDate: string;
  requestMemo: string;
  price: number;
  scheduleId: string;
  setSteps: Dispatch<SetStateAction<'detail' | 'final'>>;
}

function BookingFinal({
  title,
  description,
  image,
  currency,
  price,
  guestCount,
  finalDate,
  requestMemo,
  setSteps,
  scheduleId,
}: BookingFinal) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { mutate, isError, isPending } = useRegisterBookingMutation(() => setModalOpen(true));
  const handleClick = async () => {
    await mutate({
      guestCount,
      scheduleId,
    });
  };

  useEffect(() => {
    if (!modalOpen) return;

    const timer = setTimeout(() => {
      setModalOpen(false);
      router.replace('/my/bookings');
    }, 1000);

    return () => clearTimeout(timer);
  }, [modalOpen, router]);

  return (
    <div className="flex min-h-dvh flex-col gap-6 bg-white pb-24 font-['Pretendard']">
      <div className="flex h-fit flex-row gap-4 px-4">
        <Image
          src={image}
          alt={'booking-image'}
          width={100}
          height={100}
          className="size-25 rounded-2xl"
        ></Image>
        <div className="flex flex-col gap-4">
          <h4 className="text-title-lg">{title}</h4>
          <h4 className="text-caption-md">{description}</h4>
        </div>
      </div>
      <hr className="border-2" />
      <div className="flex flex-col gap-5 px-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Guest</span>
          <span className="text-body-lg text-gray-600">{`${guestCount} people`}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Date</span>
          <span className="text-body-lg text-gray-600">{finalDate}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Request Memo</span>
          <p className="text-body-lg text-gray-600">{requestMemo}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-body-xl text-gray-600">Total Amount </span>
          <span className="text-headline-lg text-gray-600">
            {currency === 'USD' ? `$${price} USD` : `₩${price} KRW`}
          </span>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 h-fit w-full bg-gray-50 px-4 py-8">
        <button
          onClick={handleClick}
          disabled={isPending}
          className="text-button-md bg-primary-normal w-full rounded-lg p-3 text-white"
        >
          {isPending ? 'requesting... ' : 'Request Book'}
        </button>
      </div>
      {modalOpen && (
        <ModalDim>
          {
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-white p-5">
              <div className="flex flex-col justify-center">
                <span className="text-title-lg text-center">YAY! Your booking has</span>
                <span className="text-title-lg text-center">successfully requested.</span>
              </div>
              <span className="text-body-lg">Please wait untill the host accept your request</span>
            </div>
          }
        </ModalDim>
      )}
    </div>
  );
}

export default BookingFinal;
