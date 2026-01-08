'use client';
import { UserProfileResponse } from '@/entities/user/model/types';
import {
  useUserProfileMutation,
  useUserProfileQuery,
} from '@/features/user/model/user-profile-queries';
import SingleImagePreviewInput from '@/features/user/ui/image-uplaoder';
import { ALL_INTERESTS, getInterestLabel } from '@/shared/data/interests';
import { ALL_LANGUAGES, getLanguageLabel } from '@/shared/data/languageList';
import { ALL_PERSONALITIES, getPersonalityLabel } from '@/shared/data/personalities';
import Badge from '@/shared/ui/badge';
import Header from '@/shared/ui/header';
import { Input } from '@/shared/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function EditProfile() {
  const router = useRouter();
  const { data: profile, isLoading } = useUserProfileQuery();
  const { mutate, isPending, error } = useUserProfileMutation(() => {
    router.replace('/my/profile');
  });

  const emptyForm: UserProfileResponse = {
    profileImage: '',
    languages: [],
    interests: [],
    personalities: [],
    name: '',
    aboutMe: '',
  };

  const [form, setForm] = useState<UserProfileResponse>(emptyForm);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!profile || isDirty) return;
    setForm({
      profileImage: profile.profileImage ?? '',
      languages: profile.languages ?? [],
      interests: profile.interests ?? [],
      personalities: profile.personalities ?? [],
      name: profile.name ?? '',
      aboutMe: profile.aboutMe ?? '',
    });
  }, [profile, isDirty]);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const MAX = 3;

  const toggle = (key: 'languages' | 'interests' | 'personalities', value: string) => {
    setIsDirty(true);

    setForm((prev) => {
      const current = prev[key];
      const isSelected = current.includes(value);

      // 해제는 항상 허용
      if (isSelected) {
        return { ...prev, [key]: current.filter((v) => v !== value) };
      }

      // 추가인데 이미 3개면 막기
      if (current.length >= MAX) {
        return prev; // 변경 없음
      }

      // 추가
      return { ...prev, [key]: [...current, value] };
    });
  };

  const handleLanguages = (value: string) => {
    toggle('languages', value);
  };
  const handleInterests = (value: string) => {
    toggle('interests', value);
  };
  const handlePersonality = (value: string) => {
    toggle('personalities', value);
  };

  const update = <K extends keyof UserProfileResponse>(key: K, value: UserProfileResponse[K]) => {
    setIsDirty(true);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    mutate({
      profileImage: profileImageFile,
      name: form.name,
      aboutMe: form.aboutMe,
      interests: form.interests,
      personalities: form.personalities,
      languages: form.languages,
    });
  };
  return (
    <div className="flex flex-col gap-7 pt-14 px-4">
      <Header />
      <SingleImagePreviewInput
        value={profileImageFile}
        onChange={(file) => {
          setIsDirty(true);
          setProfileImageFile(file);
        }}
        defaultImageUrl={form.profileImage || '/a.jpg'}
      />
      <Input
        label={'Name'}
        name={'wrtie down you name'}
        value={form.name}
        onChange={(value) => update('name', value)}
        placeHolder={'Write down your name'}
      />
      <hr />
      <Input
        label={'About me'}
        name={'Write about you'}
        value={form.aboutMe}
        onChange={(value) => update('aboutMe', value)}
        placeHolder={'Write about you'}
      />
      <hr />

      <div className="flex flex-col gap-3">
        <h3>{'Language'}</h3>
        <div className="flex flex-row flex-wrap  gap-2">
          {ALL_LANGUAGES.map((value) => (
            <Badge
              key={value}
              content={getLanguageLabel(value, false)}
              selected={form.languages.includes(value)}
              onClick={() => handleLanguages(value)}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <h3>{'Interest'}</h3>
        <div className="flex flex-row flex-wrap  gap-2">
          {ALL_INTERESTS.map((value) => (
            <Badge
              key={value}
              content={getInterestLabel(value)}
              selected={form.interests.includes(value)}
              onClick={() => handleInterests(value)}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <h3>{'Personality'}</h3>
        <div className="flex flex-row flex-wrap  gap-2">
          {ALL_PERSONALITIES.map((value) => (
            <Badge
              key={value}
              content={getPersonalityLabel(value)}
              selected={form.personalities.includes(value)}
              onClick={() => handlePersonality(value)}
            />
          ))}
        </div>
      </div>
      <hr />
      <button
        onClick={handleSubmit}
        disabled={isPending || isLoading}
        className="text-white bg-black p-3 text-button-md rounded-2xl align-middle h-10 w-full "
      >
        Save
      </button>
    </div>
  );
}

export default EditProfile;
