'use client';

import { useCreateReview } from '@/entities/user/model/reviews/model/queries';
import ReviewInputs from '@/entities/user/model/reviews/ui/review-inputs';
import { useGuestExperienceDetailtQuery } from '@/features/experience/model/manage-guest-experience/queries';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ReviewInputSection({
  experienceId,
  reservationId,
}: {
  experienceId: string;
  reservationId: string;
}) {
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [star, setStar] = useState(0);
  const router = useRouter();
  const { data, isLoading } = useGuestExperienceDetailtQuery(experienceId);
  const { mutate } = useCreateReview(() => {
    router.replace('/my/reviews');
  });
  const handleSubmitReview = async () => {
    await mutate({
      reservationId: reservationId,
      rating: star,
      comment: description,
      imageFiles: images,
      folder: 'reviews',
      files: images.map((value, index) => {
        return {
          fileName: `experience-image-${index}`,
          contentType: value.type,
          fileSize: value.size,
        };
      }),
    });
  };
  if (!data) return <>... data unavaliable</>;
  return (
    <div className="min-h-screen">
      <header className="flex flex-row items-center py-4 h-[63px] bg-white sticky top-0 z-10">
        <button onClick={() => router.back()} className="mr-3">
          <ChevronLeft size={24} className="text-[#020202]" />
        </button>
        <h1 className="font-suit font-semibold text-[18px] leading-[140%] text-[#020202]">
          Review
        </h1>
      </header>
      <ExperienceItem
        id={reservationId}
        title={data.title}
        dateTime={data.host?.nickname ?? ''}
        image={data.photos[0]}
        experienceId={experienceId}
      />
      <hr className="-mx-4 md:-mx-60. border-2 mt-6 mb-4" />
      <ReviewInputs
        star={star}
        setStar={setStar}
        description={description}
        setDescription={setDescription}
        value={images}
        onChange={setImages}
        maxFiles={8}
      />
      <div className="py-8">
        <button
          onClick={handleSubmitReview}
          className="flex justify-center items-end w-full bg-black text-white text-button-md py-[13px] rounded-xl"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default ReviewInputSection;
