'use client';
import { useUserProfileMutation } from '@/features/user-profile/model/use-user-profile';
import SingleImageUpload from '@/features/user-profile/ui/image-uplaoder';
import ImageUploadPreviewTailwind from '@/features/user-profile/ui/image-uplaoder';
import { toggleInArray } from '@/shared/lib/utils';
import Categories from '@/shared/ui/categories';
import { Input } from '@/shared/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function EditProfile() {
  const router = useRouter();
  const { mutate, isPending, error } = useUserProfileMutation(() => {
    router.push('/users');
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const handleLanguages = (value: string) => {
    setSelectedLanguages((prev) => toggleInArray(prev, value));
  };
  const handleInterests = (value: string) => {
    setSelectedInterests((prev) => toggleInArray(prev, value));
  };
  const handlePersonality = (value: string) => {
    setSelectedPersonality((prev) => toggleInArray(prev, value));
  };

  const handleSubmit = async () => {
    await mutate({
      profileImage: '',
      name: name,
      aboutMe: aboutMe,
      interests: selectedInterests,
      personalities: selectedPersonality,
      languages: selectedLanguages,
    });
  };
  return (
    <div className="flex flex-col gap-7 ">
      <SingleImageUpload onChange={(file) => console.log(file)} />
      <Input
        label={'Name'}
        name={'wrtie down you name'}
        value={name}
        onChange={setName}
        placeHolder={'Write down your name'}
      />
      <hr />
      <Input
        label={'About me'}
        name={'Write about you'}
        value={aboutMe}
        onChange={setAboutMe}
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
        selectedCategories={selectedLanguages}
        setSelectedCategories={setSelectedLanguages}
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
          'Local food',
          'Street food',
          'Dessert',
          'Art',
          'Fashion',
          'Etc',
        ]}
        selectedCategories={selectedInterests}
        setSelectedCategories={setSelectedInterests}
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
        selectedCategories={selectedPersonality}
        setSelectedCategories={setSelectedPersonality}
        handleToggle={handlePersonality}
      />
      <hr />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}

export default EditProfile;
