'use client';

import Image from 'next/image';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import Link from 'next/link';
import Header from '@/shared/ui/header';
import { HostProfileDetail } from '@/entities/host/model/types';
import { getPopbadgeDisplay, POPBADGES } from '@/shared/data/popbadges';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import PopBadge from '@/shared/ui/popbadge';
import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';
import { useHostStore } from '@/processes/profile-session/use-host-profile-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import ExperienceCard from '@/widget/experience-card';

type QueryLike<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
};

function HostProfileView<T extends HostProfileDetail>({ query }: { query: QueryLike<T> }) {
  const { data, isLoading, isError } = query;

  const [tabExperience, setTabExperience] = useState(false);
  const setHost = useHostStore((s) => s.setHost);

  const host = data?.host;

  useEffect(() => {
    if (host) {
      setHost(host);
    }
  }, [host, setHost]);

  if (isLoading) return <>....Loading</>;
  if (isError) return <>Something went wrong</>;
  if (!data || !host) return <>Could not find HOST PROFILE</>;

  const { experiences, categories } = data;
  const badgeName = host?.popBadge?.[0];
  const popbadge = POPBADGES.find((tag) => tag.name === badgeName);
  const displayBadge = popbadge ? `${popbadge.emoji} ${popbadge.label}` : badgeName;

  return (
    <div className="text-gray-600 flex flex-col pt-14">
      <Header />
      <div className="">
        <div className="relative w-full h-[451px] bg-red-100 z-10">
          <ImageWithFallback alt="" src={host.profileImage ?? '/a.jpg'} fill />
        </div>
        <div className="relative flex flex-col gap-5 justify-center items-center w-full bg-white -mt-5 rounded-t-5 z-40 px-4 pt-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="ty-heading-3 text-label">{host.nickname}</div>
              <div className="flex flex-row gap-1">
                <PopBadge content={getPopbadgeDisplay(displayBadge)} />
              </div>
            </div>
            <div className="ty-body-2-semibold text-label text-center">{`"${host.tagline}"`}</div>
            <p className="ty-body-2-regular text-label-subtle text-center">{host.aboutMe}</p>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            {host.socialLinks.instagram && (
              <Link
                href={host.socialLinks.instagram}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <Image src={'/icons/instagram.svg'} alt={'instagramIcon'} fill />
                </span>
              </Link>
            )}
            {host.socialLinks.tiktok && (
              <Link
                href={host.socialLinks.tiktok}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <Image src={'/icons/tiktok.svg'} alt={'tiktokIcon'} fill />
                </span>
              </Link>
            )}
            {host.socialLinks.youtube && (
              <Link
                href={host.socialLinks.youtube}
                className="ring px-6 py-2 rounded-full ring-gray-200"
              >
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <Image src={'/icons/youtube.svg'} alt={'youtubeIcon'} fill />
                </span>
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
              onClick={() => setTabExperience(false)}
              className={cn(
                'mx-2 mt-3 flex-1 text-center border-b-2 border-transparent pb-4 ty-body-1-semibold',
                !tabExperience && ' border-black text-black',
              )}
            >
              Babmate
            </button>
            <button
              onClick={() => setTabExperience(true)}
              className={cn(
                'mx-2 mt-3 flex-1 text-center border-b-2 border-transparent pb-4 ty-body-1-semibold ',
                tabExperience && ' border-black text-black',
              )}
            >
              Experience
            </button>
          </div>
        </div>
      </div>

      {tabExperience ? (
        <div className="flex flex-col gap-4 bg-background-subtle px-4 py-4 space-y-4">
          {experiences.map((value, index) => {
            return (
              <ExperienceCard
                key={index}
                id={value.id}
                image={value.photos[0]}
                title={value.title}
                description={value.description}
                area={value.meetingArea}
                guestCount={value.maxGuests}
                duration={value.durationHours}
                price={value.price}
                popbadge={value.category}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-background-subtle flex flex-col gap-4">
          <div className="p4 flex flex-col gap-2 bg-white rounded-5 p-4 shadow-1">
            <h1 className="text-heading-3 text-label">Area</h1>
            <span className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit">
              {host.area}
            </span>
          </div>
          <div className="p4 flex flex-col gap-2 bg-white rounded-5 p-4 shadow-1">
            <h1 className="text-heading-3 text-label">Language</h1>
            <div className="flex flex-row gap-1">
              {host.languages.map((value, index) => {
                return (
                  <span
                    key={index}
                    className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit"
                  >
                    {value}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white rounded-5 p-4 shadow-1">
            <h1 className="text-heading-3 text-label">Flavor Profile</h1>
            <div className="flex flex-col gap-2">
              <h3 className="text-body-2-semibold text-label-subtle">Go-to Restaurant Type</h3>
              <div className="flex flex-row gap-1">
                {host.restaurantStyles.map((value, index) => {
                  return (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit"
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h3 className="text-body-2-semibold text-label-subtle">Favorite Taste</h3>
              <div className="flex flex-row gap-1">
                {host.flavorPreferences.map((value, index) => {
                  return (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit"
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h3 className="text-body-2-semibold">Favorite Food</h3>
              <div className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit">
                {host.favoriteFood}
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h3 className="text-body-2-semibold">Signature Dish</h3>
              <div className="px-3 py-2 rounded-full border border-gray-200 text-badge text-label-subtle w-fit">
                {host.signatureDish}
              </div>
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
}

export default HostProfileView;
