'use client';

import { Star } from 'lucide-react';
import Header from '@/shared/ui/header';

const MOCK_REVIEWS = [
  {
    id: 1,
    experienceName: 'Experience Name',
    rating: 5,
    date: '11 May 2024',
    content: 'It was so good',
    images: ['', '', ''],
  },
  {
    id: 2,
    experienceName: 'Another Experience',
    rating: 4,
    date: '10 May 2024',
    content: 'Very nice experience!',
    images: ['', ''],
  },
  {
    id: 3,
    experienceName: 'Great Atmosphere',
    rating: 5,
    date: '05 May 2024',
    content: 'Loved the vibe and the people.',
    images: [''],
  },
  {
    id: 4,
    experienceName: 'Delicious Food',
    rating: 3,
    date: '01 May 2024',
    content: 'Food was okay, but service could be better.',
    images: ['', '', '', ''],
  },
  {
    id: 5,
    experienceName: 'Chill Spot',
    rating: 4,
    date: '28 Apr 2024',
    content: 'A perfect place to relax on a weekend.',
    images: [''],
  },
];

// function Header() {
//   return (
//     <header className="absolute top-0 left-0 right-0 z-50 bg-transparent w-full h-[52px]">
//       <div className="flex w-full pt-5 pb-2 items-center justify-between px-4">
//         <h1 className="text-lg font-semibold">Babmate</h1>
//         <div className="flex flex-row items-center gap-5">
//           <CustomSheet />
//         </div>
//       </div>
//     </header>
//   );
// }

export default function MyReviewPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA]">
      <Header />
      <div className="mt-[76px] mb-6 px-4">
        <h1 className="font-suit font-semibold text-[22px] leading-[140%] text-[#020202]">
          My review
        </h1>
      </div>
      <div className="flex flex-col gap-6 pb-20 px-4">
        {MOCK_REVIEWS.map((review, index) => (
          <ReviewCard key={review.id} review={review} isLast={index === MOCK_REVIEWS.length - 1} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, isLast }: { review: any; isLast: boolean }) {
  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header />
      <div className="flex flex-row justify-between items-center w-full relative">
        {/* <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
          <MoreVertical size={24} className="text-[#020202]" />
        </button>
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsMenuOpen(false)} 
            />
            <div className="absolute right-0 top-8 z-20 w-[79px] bg-[#FAFAFA] border border-[#F3F3F5] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] rounded-lg p-5 flex flex-col gap-4">
              <button className="text-sm font-suit font-normal text-[#020202] text-left">
                Edit
              </button>
              <button className="text-sm font-suit font-normal text-[#020202] text-left">
                Delete
              </button>
            </div>
          </>
        )} */}
      </div>

      <div className="flex flex-col gap-[7px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[2px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                fill={star <= review.rating ? '#4B4B4B' : 'none'}
                stroke={star <= review.rating ? 'none' : '#4B4B4B'}
                className={star <= review.rating ? 'text-[#4B4B4B]' : 'text-[#4B4B4B]'}
              />
            ))}
          </div>
        </div>

        <span className="font-suit font-normal text-xs text-[#A0A0A0]">{review.date}</span>

        <p className="font-suit font-normal text-sm leading-[160%] text-[#020202]">
          {review.content}
        </p>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar">
          {review.images.map((img: string, idx: number) => (
            <div key={idx} className="w-[108px] h-[108px] bg-[#EAEBEF] rounded-lg flex-shrink-0" />
          ))}
        </div>
      )}

      {!isLast && <div className="w-full h-[1px] bg-[#EAEBEF]" />}
    </div>
  );
}
