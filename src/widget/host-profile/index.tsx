'use client';
import Image from 'next/image';
import Badge from '@/shared/ui/badge';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import Link from 'next/link';
import Header from '@/shared/ui/header';
import { HostProfileDetail } from '@/entities/host/model/types';
import { POPBADGES } from '@/shared/data/popbadges';

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

  return (
    <div className="text-gray-600 flex flex-col w-screen">
      <Header />
      <div className="flex flex-col justify-center items-center bg-gray-50 -mx-4 md:-mx-60 pb-5 px-4 pt-[52px]">
        <Image
          src={host.profileImage ?? '/a.jpg'}
          alt={'my host profile'}
          className="size-30 rounded-full mb-5"
          width={120}
          height={120}
        />
        <div className="text-headline-lg mb-3">{host.nickname}</div>
        <div className="text-title-md mb-2">{displayBadge}</div>
        <div className="text-title-md mb-4 text-center">{host.tagline}</div>
        <p className="text-body-lg text-gray-500 mb-4">{host.aboutMe}</p>
        <div className="flex flex-row gap-3 items-center justify-center mb-5.5">
          {host.socialLinks.instagram && (
            <Link href={host.socialLinks.instagram}>
              <Image src={'/icons/instagram.svg'} alt={'instagramIcon'} width={24} height={24} />
            </Link>
          )}
          {host.socialLinks.tiktok && (
            <Link href={host.socialLinks.tiktok}>
              <Image src={'/icons/tiktok.svg'} alt={'tiktokIcon'} width={24} height={24} />
            </Link>
          )}
          {host.socialLinks.youtube && (
            <Link href={host.socialLinks.youtube}>
              <Image src={'/icons/youtube.svg'} alt={'youtubeIcon'} width={24} height={24} />
            </Link>
          )}
          {host.socialLinks.twitter && (
            <Link href={host.socialLinks.twitter}>
              <Image src={'/icons/twitter.svg'} alt={'twitterIcon'} width={24} height={24} />
            </Link>
          )}
        </div>
        <div className="flex flex-row gap-3 overflow-x-scroll no-scrollbar justify-center">
          {categories.map((value, index) => {
            return <Badge content={value} key={index} className="bg-white"></Badge>;
          })}
        </div>
      </div>
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
    </div>
  );
}

export default HostProfileView;
