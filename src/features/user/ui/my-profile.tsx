'use client';

import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import Badge from '@/shared/ui/badge';
import Header from '@/shared/ui/header';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_IMAGE = '/a.jpg';
function MyProfile() {
  const { data: profile, isLoading, isError } = useUserProfileQuery();

  if (isLoading) return <ProfileSkeleton />;
  if (isError) return <div>Failed to load profile</div>;
  if (!profile) return <div>Profile not found</div>;

  const imageSrc = profile.profileImage || DEFAULT_IMAGE;
  return (
    <div className="w-full px-4 pt-14">
      <Header />
      <h1 className="mb-7.5 text-headline-lg">My profile</h1>
      <div className="flex flex-row gap-4">
        <div className="relative size-24 rounded-full overflow-hidden">
          <Image
            src={imageSrc}
            alt="Profile image"
            fill
            objectFit="cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIC8+PC9zdmc+"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>{profile.name}</span>
          <Link href="/my/profile/edit" className="rounded-xl bg-black px-6.5 py-2.5 text-white">
            Edit profile
          </Link>
        </div>
      </div>

      <Section title="About me">
        <p>{profile.aboutMe || '-'}</p>
      </Section>
      <hr />

      <Section title="Language">
        {profile.languages ? (
          profile.languages.map((v) => <Badge key={v} content={v} />)
        ) : (
          <Empty text="No languages" />
        )}
      </Section>
      <hr />
      <Section title="Interest">
        {profile.interests ? (
          profile.interests.map((v) => <Badge key={v} content={v} />)
        ) : (
          <Empty text="No interests" />
        )}
      </Section>
      <hr />
      <Section title="Personality">
        {profile.personalities ? (
          profile.personalities.map((v) => <Badge key={v} content={v} />)
        ) : (
          <Empty text="No personality data" />
        )}
      </Section>
    </div>
  );
}

export default MyProfile;
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col my-7 gap-3">
        <h3 className="text-title-lg">{title}</h3>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    </>
  );
}

function Empty({ text }: { text: string }) {
  return <span className="text-sm text-gray-400">{text}</span>;
}

function ProfileSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-6 h-6 w-40 rounded bg-gray-200" />
      <div className="flex gap-4">
        <div className="size-24 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
