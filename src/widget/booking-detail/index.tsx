// import { ReservationState } from '@/app/experience/[id]/page';
// import { ExperienceDetail, ScheduleLists } from '@/entities/experiences/model/types';
// import { cn } from '@/shared/lib/utils';
// import { SharedBottomSheet } from '@/shared/ui/bottom-sheet';
// import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
// import { Minus, Plus } from 'lucide-react';
// import { Dispatch, SetStateAction, useState } from 'react';

// interface BookingDetailProps {
//   experience: ExperienceDetail;
//   schedules: ScheduleLists[];
//   setSteps: Dispatch<SetStateAction<'detail' | 'final'>>;
//   handleIncrement: () => void;
//   handleDecrement: () => void;
//   count: number;
//   selectedReservation: ReservationState;
//   setSelectedReservation: Dispatch<SetStateAction<ReservationState>>;
//   getDateInfo: (dateStr: string) => {
//     year: number;
//     weekdayKor: string;
//     weekdayEng: string;
//     monthEng: string;
//     monthKor: string;
//     day: number;
//   };
// }

// function BookingDetail({
//   experience,
//   handleDecrement,
//   handleIncrement,
//   setSteps,
//   count,
//   schedules,
//   getDateInfo,
//   selectedReservation,
//   setSelectedReservation,
// }: BookingDetailProps) {
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const handleBooking = async () => {
//     setSteps('final');
//   };

//   return (
//     <div className="min-h-[100dvh] bg-white pb-24 font-['Pretendard']">
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EAEBEF] flex justify-between items-start px-5 pt-5 pb-8 z-50">
//         <div className="flex flex-col gap-1">
//           <span className="text-[17px] font-semibold leading-5 text-black">
//             {experience.price} / guest
//           </span>
//           <span className="text-[10px] font-normal leading-4 text-[#4B4B4B]">
//             No charge until host accepts
//           </span>
//         </div>
//         <SharedBottomSheet
//           open={isSheetOpen}
//           onOpenChange={(open) => {
//             setIsSheetOpen(open);
//           }}
//           title="Reservation"
//           footerButtonText={'Request to book'}
//           footerButtonTextClassName=""
//           onApply={handleBooking}
//           isSelectDisabled={selectedReservation.scheduleId === '' || count === 0}
//           trigger={
//             <button className="flex justify-center items-center w-[163.5px] h-10 px-3 py-2.5 bg-gray-600 rounded-lg gap-2.5">
//               <span className="text-white text-[14px] font-semibold leading-4">
//                 Show Availability
//               </span>
//             </button>
//           }
//         >
//           <div>
//             <h3 className="text-body-lg mb-4">Guests</h3>
//             <div className="flex flex-row items-center mb-6">
//               <button
//                 onClick={handleDecrement}
//                 disabled={count === 0}
//                 className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ${
//                   count === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <Minus className="w-4 h-4 text-gray-600" />
//               </button>
//               <span className="mx-3 text-[16px] font-medium min-w-[20px] text-center">{count}</span>
//               <button
//                 onClick={handleIncrement}
//                 className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
//               >
//                 <Plus className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>
//             <h3 className="text-body-lg mb-3">Date</h3>
//             <div className="shrink-0">
//               <CustomCalendar />
//             </div>
//             <div className="flex flex-col gap-3">
//               {schedules.map((value) => {
//                 const { year, weekdayEng, monthEng, day } = getDateInfo(value.date);
//                 const dateText = `${weekdayEng} ${day} ${monthEng} ${year} / ${value.startTime.slice(
//                   0,
//                   5,
//                 )} - ${value.endTime.slice(0, 5)}`;
//                 return (
//                   <button
//                     onClick={() =>
//                       setSelectedReservation({
//                         experienceId: value.experienceId ?? '',
//                         scheduleId: value.id ?? '',
//                         finalDate: dateText,
//                       })
//                     }
//                     className={cn(
//                       'text-body-xl text-gray-500 bg-purewhite border border-gray-400 text-center rounded-xl py-3.5',
//                       selectedReservation.scheduleId == value.id && ' bg-gray-50 border-black',
//                     )}
//                     key={value.id}
//                   >
//                     {dateText}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </SharedBottomSheet>
//       </div>
//     </div>
//   );
// }

// export default BookingDetail;
