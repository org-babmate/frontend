import { useRegisterBookingMutation } from '@/features/bookings/model/use-booking';
import ModalDim from '@/shared/ui/modal-dim';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface BookingFinal {
  image: string;
  guestCount: number;
  finalDate: string;
  requestMemo: string;
  questCount: number;
  scheduleId: string;
  setSteps: Dispatch<SetStateAction<'detail' | 'final'>>;
}

function BookingFinal({
  image,
  guestCount,
  finalDate,
  requestMemo,
  setSteps,
  scheduleId,
}: BookingFinal) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { mutate, isError } = useRegisterBookingMutation();
  const handleClick = async () => {
    await mutate({
      guestCount,
      scheduleId,
    });
    setModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const timer = setTimeout(() => {
      setModalOpen(false);
      router.push('/my/bookings');
    }, 2000);
    return () => clearTimeout(timer);
  }, [modalOpen, router]);

  return (
    <div className="min-h-screen  bg-white pb-24 font-['Pretendard'] flex gap-6 flex-col">
      <div className="relative  w-screen -mx-4 h-[57px] bg-[#EAEBEF] flex items-center">
        <button
          onClick={() => setSteps('detail')}
          className="absolute w-full h-[24px] z-20 flex flex-row justify-start px-4 gap-3"
          aria-label="Go back"
        >
          <ChevronLeft className="h-full text-black drop-shadow-md" strokeWidth={2.5} />
          <span className="text-headline-md text-gray-600">Booking</span>
        </button>
      </div>
      <div className="flex flex-row gap-4 h-25 mt-[27px]">
        {/* TODO: FIX IMAGE SRC */}
        <Image
          src={'/a.jpg'}
          alt={'booking-image'}
          width={100}
          height={100}
          className="rounded-2xl"
        ></Image>
        <div className="flex flex-col gap-4">
          <h4 className="text-title-lg">Experience Name</h4>
          <h4 className="text-caption-md">Description</h4>
        </div>
      </div>
      <hr className="-mx-4 md:-mx-60 border-2" />
      <div className="flex flex-col gap-5">
        <div className="gap-2 flex flex-col">
          <span className="text-sm font-semibold ">Guest</span>
          <span className="text-body-lg text-gray-600">{`${guestCount} people`}</span>
        </div>
        <div className="gap-2 flex flex-col">
          <span className="text-sm font-semibold ">Date</span>
          <span className="text-body-lg text-gray-600">{finalDate}</span>
        </div>
        <div className="gap-2 flex flex-col">
          <span className="text-sm font-semibold ">Request Memo</span>
          <p className="text-body-lg text-gray-600">{requestMemo}</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-body-xl text-gray-600">Total Amount </span>
          <span className="text-headline-lg text-gray-600">$90 USD</span>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-gray-50 left-0 h-fit px-4 py-8">
        <button
          onClick={handleClick}
          className="text-button-md bg-black text-white p-3 w-full rounded-lg"
        >
          Request Book
        </button>
      </div>
      {modalOpen && (
        <ModalDim>
          {
            <div className="bg-purewhite p-5 flex flex-col gap-2 rounded-xl justify-center items-center">
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
