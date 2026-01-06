'use client';
import Image from 'next/image';
import Badge from '@/shared/ui/badge';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import Link from 'next/link';
import Header from '@/shared/ui/header';
import { HostProfileDetail } from '@/entities/host/model/types';
import { getPopbadgeDisplay, POPBADGES } from '@/shared/data/popbadges';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import PopBadge from '@/shared/ui/popbadge';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';

type QueryLike<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
};

function HostProfileView<T extends HostProfileDetail>({ query }: { query: QueryLike<T> }) {
  const { data, isLoading, isError } = query;
  if (!data) {
    return <>Coud not Find HOST PROFILE</>;
  }
  if (isLoading) {
    return <>....Laoding </>;
  }
  if (isError) {
    return <>Something went wrong</>;
  }
  const { host, experiences, categories } = data;
  const badgeName = host.popBadge[0];

  const popbadge = POPBADGES.find((tag) => tag.name === badgeName);

  const displayBadge = popbadge ? `${popbadge.emoji} ${popbadge.label}` : badgeName;
  const [tabExperience, setTabExperience] = useState(true);

  return (
    <div className="text-gray-600 flex flex-col">
      <Header />
      <div className="-mx-4 md:-mx-60 w-screen">
        <div className="relative w-full h-[451px] bg-red-100 z-10">
          <ImageWithFallback alt="" src={host.profileImage ?? '/a.jpg'} fill />
        </div>
        <div className="relative flex flex-col gap-4 justify-center items-center w-full bg-white -mt-5 rounded-t-[20px] z-40 px-4 pt-5">
          <div className="flex flex-row items-center justify-center">
            <div className="text-headline-lg mr-1">{host.nickname}</div>
            <span className="mr-0.5">∙</span>
            <PopBadge content={getPopbadgeDisplay(displayBadge)} />
          </div>
          <div className="text-title-md mb-4 text-center">{`"${host.tagline}"`}</div>
          <p className="text-body-2-regular text-gray-500 mb-4">{host.aboutMe}</p>
          <div className="flex flex-row gap-3 items-center justify-center">
            {host.socialLinks.instagram && (
              <Link
                href={host.socialLinks.instagram}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <Image src={'/icons/instagram.svg'} alt={'instagramIcon'} width={24} height={24} />
              </Link>
            )}
            {host.socialLinks.tiktok && (
              <Link
                href={host.socialLinks.tiktok}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <Image src={'/icons/tiktok.svg'} alt={'tiktokIcon'} width={24} height={24} />
              </Link>
            )}
            {host.socialLinks.youtube && (
              <Link
                href={host.socialLinks.youtube}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <Image src={'/icons/youtube.svg'} alt={'youtubeIcon'} width={24} height={24} />
              </Link>
            )}
            {host.socialLinks.twitter && (
              <Link
                href={host.socialLinks.twitter}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <Image src={'/icons/twitter.svg'} alt={'twitterIcon'} width={24} height={24} />
              </Link>
            )}
          </div>
          <div className="flex flex-row w-full">
            <button
              onClick={() => setTabExperience(true)}
              className={cn(
                'mx-2 mt-3 flex-1 text-center border-b-2 border-transparent pb-4 text-body-1-semibold ',
                tabExperience && ' border-black text-black',
              )}
            >
              Experience
            </button>
            <button
              onClick={() => setTabExperience(false)}
              className={cn(
                'mx-2 mt-3 flex-1 text-center border-b-2 border-transparent pb-4 text-body-1-semibold',
                !tabExperience && ' border-black text-black',
              )}
            >
              Babmate
            </button>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col justify-center items-center  pb-5 px-4 ">
        <div className="flex flex-row gap-3 overflow-x-scroll no-scrollbar justify-center">
          {categories.map((value, index) => {
            return <Badge content={value} key={index} className="bg-white"></Badge>;
          })}
        </div>
      </div> */}

      {tabExperience ? (
        <div className="p-4 flex flex-col gap-2">
          {experiences.map((value, index) => {
            return (
              <div key={index}>
                {index !== 0 && <hr />}
                <ExperienceItem
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  dateTime={''}
                  image={value.photos[0]}
                  experienceId={value.id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <section className="w-full">
            <div className="py-6 flex flex-col gap-3">
              <h1 className="text-title-lg text-gray-600">Go-to Neighborhoods</h1>
              <span>{host.area}</span>
            </div>
            <hr />
            <div className="space-y-3 pt-6 pb-4">
              <h1>Language I speak</h1>
              <div className="flex flex-row gap-3">
                {host.languages.map((value, index) => {
                  return (
                    <span
                      key={index}
                      className="px-5 py-3.5 rounded-full border border-gray-100 text-badge text-gray-600 "
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
          <hr className=" border-2 -mx-4 md:-mx-60" />

          <h1 className="text-title-lg pt-6">Flavor Profile</h1>
          <section className="py-6 space-y-6">
            <div className="flex flex-col gap-3 ">
              <span className="text-title-md">Go-to Restaurant Type</span>
              <div className="flex flex-row gap-3">
                {host.restaurantStyles.map((value, index) => {
                  return (
                    <span
                      key={index}
                      className="px-5 py-3.5 rounded-full border border-gray-100 text-badge text-gray-600 "
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <span className="text-title-md">Favorite Taste</span>
              <div className="flex flex-row gap-3">
                {host.flavorPreferences.map((value, index) => {
                  return (
                    <span
                      key={index}
                      className="px-5 py-3.5 rounded-full border border-gray-100 text-badge text-gray-600 "
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-title-md">Favorite Food</span>
              <div className="text-body-lg">{host.favoriteFood}</div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-title-md">Signature Dish</span>
              <div className="text-body-lg">{host.signatureDish}</div>
            </div>
          </section>
          <hr className=" border-2 -mx-4 md:-mx-60" />

          <section className="py-4">
            <h1 className="text-title-lg">Experience</h1>
            <div>
              {experiences.map((value, index) => {
                return (
                  <div key={index}>
                    {index !== 0 && <hr />}
                    <ExperienceItem
                      id={value.id}
                      title={value.title}
                      description={value.description}
                      dateTime={''}
                      image={value.photos[0]}
                      experienceId={value.id}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default HostProfileView;
