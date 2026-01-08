'use client';

import Image from 'next/image';
import Text from '@/shared/ui/text';
import { Input } from '@/shared/ui/input';
import TagButton from '@/shared/ui/button/TagButton';
import TextArea from '@/shared/ui/input/TextArea';
import { Language, LANGUAGELIST } from '@/shared/data/languageList';
import CateButton from '@/shared/ui/button/CateButton';
import { MoodTag, MOODTAG } from '@/shared/data/moodTag';
import { TasteTag, TASTETAG } from '@/shared/data/tasteList';
import ActionButton from '@/shared/ui/button/ActionButton';
import { useEffect, useRef, useState } from 'react';
import { uploadImage } from '@/shared/api/image-upload/apis';
import { ProfileImageInput } from '@/entities/user/model/types';
import { HostProfile as HostProfileType } from '@/entities/host/model/types';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useRouter } from 'next/navigation';
import {
  useMyHostProfileQuery,
  useMyHostRegisterMutation,
  useMyHostUpdateMutation,
} from '@/features/host/model/host-profile-queries';
import { PopbadgeName, POPBADGES } from '@/shared/data/popbadges';
import { MapPin } from 'lucide-react';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { SEOUL_LOCATIONS, SeoulLocation } from '@/shared/data/locations';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/ui/error';
import { useHostStore } from '@/processes/profile-session/use-host-profile-store';

export default function HostProfile() {
  const [profile, setProfile] = useState<HostProfileType>({
    profileImage: '',
    nickname: '',
    popBadge: [],
    tagline: '',
    aboutMe: '',
    socialLinks: {
      instagram: '',
      youtube: '',
      tiktok: '',
      twitter: '',
    },
    area: null,
    languages: [],
    restaurantStyles: [],
    flavorPreferences: [],
    favoriteFood: '',
    signatureDish: '',
  });

  const isHost = useUserStore((s) => s.isHost);
  const { data, isLoading } = useMyHostProfileQuery(isHost);
  const setHost = useHostStore((s) => s.setHost);

  const [meetingArea, setMeetingArea] = useState<SeoulLocation>('Hongdae');

  useEffect(() => {
    if (data && isHost) {
      setProfile(data.host);
    }
  }, [data]);

  function toggleWithLimit<T extends string>(prev: readonly T[], value: T, max: number): T[] {
    if (prev.includes(value)) {
      return prev.filter((v) => v !== value);
    }

    if (prev.length >= max) {
      return [...prev];
    }

    return [...prev, value];
  }
  function setPopBadge(badge: PopbadgeName) {
    setProfile((prev) => ({
      ...prev,
      popBadge: toggleWithLimit(prev.popBadge, badge, 3),
    }));
  }

  function setLanguage(lan: Language) {
    setProfile((prev) => ({
      ...prev,
      languages: toggleWithLimit(prev.languages, lan, 5),
    }));
  }

  function setRestaurantStyles(res: MoodTag) {
    setProfile((prev) => ({
      ...prev,
      restaurantStyles: toggleWithLimit(prev.restaurantStyles, res, 3),
    }));
  }

  function setFlavorPreferences(flavor: TasteTag) {
    setProfile((prev) => ({
      ...prev,
      flavorPreferences: toggleWithLimit(prev.flavorPreferences, flavor, 3),
    }));
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지는 5MB 이하만 업로드 가능합니다.');
      return;
    }

    try {
      function isFile(v: unknown): v is File {
        return typeof File !== 'undefined' && v instanceof File;
      }

      let profileImageUrl: ProfileImageInput = '';

      if (isFile(file)) {
        const uploaded = await uploadImage({
          imageFile: file,
          folder: 'hosts',
          file: {
            fileName: `host-profileImage`,
            contentType: file.type || 'image/jpeg',
            fileSize: file.size,
          },
        });

        profileImageUrl = uploaded.publicUrl ?? uploaded.publicUrl;
      }

      setProfile((prev) => ({
        ...prev,
        profileImage: profileImageUrl, // ✅ 항상 ProfileImageInput
      }));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const router = useRouter();
  const { mutate: registerHost } = useMyHostRegisterMutation();
  const { mutate: updateHost } = useMyHostUpdateMutation(() => {
    router.push('/host/profile');
  });

  function sanitizeSocialLinks(links: HostProfileType['socialLinks']) {
    return Object.fromEntries(
      Object.entries(links).filter(([, value]) => value && value.trim() !== ''),
    );
  }

  const handleSubmit = async () => {
    const payload = {
      ...profile,
      socialLinks: sanitizeSocialLinks(profile.socialLinks),
      area: meetingArea,
    };

    if (isHost) {
      await updateHost(payload);
    } else {
      await registerHost(payload);
    }
    router.push('/host/profile');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* <header className="flex h-14">
        <div className="flex w-44 justify-between items-center">
          <button onClick={() => router.back()}>
            <Image alt="bobmate" src={ArrowLeftIcon} width={11} height={11} />
          </button>
          <Text as="h1" color="text-[#020202]" weight="font-semibold" size="text-2xl">
            밥메이트 프로필
          </Text>
        </div>
      </header> */}
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-semibold">
          프로필 사진<span className="text-red-500"> *</span>
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          본인을 잘 나타내주는 이미지를 등록해주세요.
        </Text>
        <div className="w-20 h-20 relative">
          {/* 프로필 이미지 or 기본 배경 */}
          {profile.profileImage ? (
            <Image
              src={profile.profileImage}
              alt="bobmate 호스트 프로필 이미지"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#F3F3F5]" />
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 right-0"
          >
            <Image src={'/icons/edit.svg'} alt="프로필 이미지 수정" width={24} height={24} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex text-md">
          <Text size="text-md" color="text-[#000000]" weight="font-semibold">
            밥메이트 이름
          </Text>
          <Text size="text-md" color="text-[#EF4040]">
            *
          </Text>
        </div>
        <div>
          <Input
            label=""
            name="밥메이트 이름"
            type="text"
            value={profile.nickname}
            error=""
            placeHolder="활동할 밥메이트 이름을 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                nickname: value,
              }))
            }
          />
          <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
            {profile.nickname.length}/20
          </Text>
        </div>
      </div>
      {/* <hr className="w-[110%] h-2 bg-[#F3F3F5] relative left-[-16]" /> */}
      <Text size="text-md" weight="font-semibold" color="text-[#000000]">
        나에 대한 정보
      </Text>
      <Text className="text-md">
        바이브 태그 <span className="text-red-500"> *</span>
      </Text>
      <div>
        {POPBADGES.map((tag) => (
          <div key={tag.name} className="inline-block mr-2.5 mb-2.5">
            <TagButton
              active={profile.popBadge.includes(tag.name) ? true : false}
              onClick={() => setPopBadge(tag.name)}
              name={tag.name}
              label={tag.label}
              emoji={tag.emoji}
            />
          </div>
        ))}
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          한 줄 바이브 <span className="text-red-500"> *</span>
        </Text>
        <div>
          <Text size="text-sm" color="text-[#4B4B4B]">
            본인의 바이브를 잘 나타내주는 한 문장을 입력해주세요.
          </Text>
          <Text size="text-sm" color="text-[#4B4B4B]">
            예시) “대담한 맛, 대담한 우정”
          </Text>
        </div>
        <div className="">
          <div className="relative">
            <Input
              label=""
              name="밥메이트 이름"
              type="text"
              value={profile.tagline}
              error=""
              placeHolder="한줄 바이브를 입력해주세요."
              onChange={(value: string) =>
                setProfile((prev) => ({
                  ...prev,
                  tagline: value,
                }))
              }
            />
          </div>
          <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
            {profile.tagline.length}/80
          </Text>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          밥메이트 소개 <span className="text-red-500"> *</span>
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          본인의 스토리, 취향, 인삿말등을 자유롭게 입력해주세요.
        </Text>
        <div className="">
          <TextArea
            label=""
            name="밥메이트 호스트 소개"
            value={profile.aboutMe}
            error=""
            placeHolder="소개글을 입력해주세요"
            size="h-20"
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                aboutMe: value,
              }))
            }
          />
          <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
            {profile.aboutMe.length}/200
          </Text>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          소셜미디어
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          인스타그램, X, 유튜브 등 본인의 소셜미디어 링크를 입력해주세요.
        </Text>
        <div className="w-full flex justify-between gap-3">
          <Image
            alt="bobmate 호스트 인스타그램"
            src={'/icons/instagram.svg'}
            width={24}
            height={24}
          />
          <Input
            label=""
            name="instagram"
            type="text"
            value={profile.socialLinks?.instagram ?? ''}
            error=""
            placeHolder="소셜미디어 주소를 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, instagram: value },
              }))
            }
          />
        </div>
        <div className="w-full flex justify-between gap-3">
          <Image alt="bobmate host youtube" src={'/icons/youtube.svg'} width={24} height={24} />
          <Input
            label=""
            name="youtube"
            type="text"
            value={profile.socialLinks?.youtube ?? ''}
            error=""
            placeHolder="소셜미디어 주소를 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, youtube: value },
              }))
            }
          />
        </div>
        <div className="w-full flex justify-between gap-3">
          <Image alt="bobmate host Tiktok" src={'/icons/tiktok.svg'} width={24} height={24} />
          <Input
            label=""
            name="tiktok"
            type="text"
            value={profile.socialLinks?.tiktok ?? ''}
            error=""
            placeHolder="소셜미디어 주소를 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, tiktok: value },
              }))
            }
          />
        </div>
        <div className="w-full flex justify-between gap-3">
          <Image alt="bobmate host Twitter" src={'/icons/twitter.svg'} width={24} height={24} />
          <Input
            label=""
            name="twitter"
            type="text"
            value={profile.socialLinks?.twitter ?? ''}
            error=""
            placeHolder="소셜미디어 주소를 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: value },
              }))
            }
          />
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          지역<span className="text-red-500"> *</span>
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          자주 가는 동네와 도시를 입력해주세요. ex) 홍대 / 서울
        </Text>
        <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
          <MapPin className="text-gray-400" />
          <CustomDropDownRadio
            value={meetingArea}
            onChange={setMeetingArea}
            values={SEOUL_LOCATIONS}
            className="ring ring-gray-100 px-4 py-3 rounded-xl"
          />
        </div>
      </div>
      <hr className="w-full" />
      <div className="">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          언어<span className="text-red-500"> *</span>
        </Text>
        <div className="my-4">
          <Text size="text-sm" color="text-[#4B4B4B]">
            최대 5개까지 선택해주세요.
          </Text>
        </div>
        {LANGUAGELIST.map((lan) => (
          <div key={lan.id} className="inline-block mr-2.5 mb-2.5">
            <CateButton
              disable={!profile.languages.includes(lan.id) && profile.languages.length >= 5}
              active={profile.languages.includes(lan.id) ? true : false}
              onClick={() => setLanguage(lan.id)}
              id={lan.id}
              label={lan.label}
              color={'text-[#4B4B4B]'}
            />
          </div>
        ))}
      </div>
      <hr className="w-full" />
      <Text size="text-md" weight="font-semibold" color="text-[#000000]">
        음식취향
      </Text>
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          내 맛집 취향<span className="text-red-500"> *</span>
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          최대 3개까지 선택해주세요.
        </Text>
        <div>
          {MOODTAG.map((mood) => (
            <div key={mood.id} className="inline-block mr-2.5 mb-2.5">
              <CateButton
                disable={
                  !profile.restaurantStyles.includes(mood.id) &&
                  profile.restaurantStyles.length >= 3
                }
                active={profile.restaurantStyles.includes(mood.id) ? true : false}
                onClick={() => setRestaurantStyles(mood.id)}
                id={mood.id}
                label={mood.label}
                color={'text-[#4B4B4B]'}
              />
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          좋아하는 맛<span className="text-red-500"> *</span>
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          최대 3개까지 선택해주세요.
        </Text>
        <div>
          {TASTETAG.map((taste) => (
            <div key={taste.id} className="inline-block mr-2.5 mb-2.5">
              <CateButton
                disable={
                  !profile.flavorPreferences.includes(taste.id) &&
                  profile.flavorPreferences.length >= 5
                }
                active={profile.flavorPreferences.includes(taste.id)}
                onClick={() => setFlavorPreferences(taste.id)}
                id={taste.id}
                label={taste.label}
                color={'text-[#4B4B4B]'}
              />
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          즐겨찾는 음식
        </Text>
        <Text size="text-sm" color="text-[#4B4B4B]">
          예시) 수육, 족발, 참치찌개
        </Text>
        <div className="w-full">
          <Input
            label=""
            name="밥메이트 좋아하는 음식"
            type="text"
            value={profile.favoriteFood}
            error=""
            placeHolder="즐겨찾는 음식을 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                favoriteFood: value,
              }))
            }
          />
        </div>
        <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
          {profile.favoriteFood.length}/20
        </Text>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Text size="text-md" color="text-[#000000]" weight="font-medium">
          시그니처 음식
        </Text>

        <Text size="text-sm" color="text-[#4B4B4B]">
          쿠킹클래스를 진행하는 호스트만 입력해주세요.
        </Text>
        <div>
          <Input
            label=""
            name="밥메이트 이름"
            type="text"
            value={profile.signatureDish}
            error=""
            placeHolder="본인이 요리할 수 있는 시그니처 음식을 입력해주세요."
            onChange={(value: string) =>
              setProfile((prev) => ({
                ...prev,
                signatureDish: value,
              }))
            }
          />
          <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
            {profile.signatureDish.length}/20
          </Text>
        </div>
      </div>
      <hr className="w-full" />
      <span className="text-sm text-gray-400">*표시는 필수입력란입니다.</span>
      <ActionButton
        name="프로필 저장"
        bgColor="bg-[#020202]"
        width="w-full"
        height="h-10"
        color="text-[#FFFFFF]"
        radius="rounded-md"
        weight="font-semibold"
        onClick={handleSubmit}
      >
        프로필 저장하기
      </ActionButton>
    </div>
  );
}
