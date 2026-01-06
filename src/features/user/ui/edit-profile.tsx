'use client';
import { UserProfileResponse } from '@/entities/user/model/types';
import {
  useUserProfileMutation,
  useUserProfileQuery,
} from '@/features/user/model/user-profile-queries';
import SingleImagePreviewInput from '@/features/user/ui/image-uplaoder';

import { toggleInArray } from '@/shared/lib/utils';
import Categories from '@/shared/ui/categories';
import { Input } from '@/shared/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function EditProfile() {
  const router = useRouter();
  const { data: profile, isLoading } = useUserProfileQuery();
  const { mutate, isPending, error } = useUserProfileMutation(() => {
    router.push('/my/profile');
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

  const toggle = (key: 'languages' | 'interests' | 'personalities', value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: toggleInArray(prev[key], value),
    }));
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
    <div className="flex flex-col gap-7">
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
      <Categories
        label={'Language'}
        categories={[
          'English',
          'Korean',
          'Japanese',
          'Chinese',
          'Vietnamese',
          'Spanish',
          'Italian',
          'French',
          'German',
          'Russian',
          'Etc',
        ]}
        selectedCategories={form.languages}
        // setSelectedCategories={setSelectedLanguages}
        handleToggle={handleLanguages}
      />
      <hr />
      <Categories
        label={'Interest'}
        categories={[
          'Music',
          'Photos',
          'Games',
          'Cafe',
          'LocalFood',
          'StreetFood',
          'Dessert',
          'Art',
          'Fashion',
          'Etc',
        ]}
        selectedCategories={form.interests}
        // setSelectedCategories={setSelectedInterests}
        handleToggle={handleInterests}
      />
      <hr />
      <Categories
        label={'Personality'}
        categories={[
          'Extrovert',
          'Introvert',
          'Enthusiastic',
          'Caring',
          'Cheerful',
          'Optimistic',
          'Etc',
        ]}
        selectedCategories={form.personalities}
        // setSelectedCategories={setSelectedPersonality}
        handleToggle={handlePersonality}
      />
      <hr />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="text-white bg-black p-3 text-button-md rounded-2xl align-middle h-10 w-full "
      >
        Save
      </button>
      <button disabled={isPending || isLoading}>{isPending ? 'Saving...' : 'Save'}</button>
    </div>
  );
}

export default EditProfile;
