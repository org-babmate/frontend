'use client';
import Image from 'next/image';
import ArrowLeftIcon from '../../../../public/icons/arrow-left-icon.svg';
import Text from '@/shared/ui/text';
import EditIcon from '../../../../public/icons/edit.svg';
import { Input } from '@/shared/ui/input';

import TagButton from '@/shared/ui/button/TagButton';
import TextArea from '@/shared/ui/input/TextArea';
import { VIBE_TAGS } from '@/shared/data/vibeTag';
import { LANGUAGELIST } from '@/shared/data/languageList';
import CateButton from '@/shared/ui/button/CateButton';
import { MOODTAG } from '@/shared/data/moodTag';
import { TASTETAG } from '@/shared/data/tasteList';
import ActionButton from '@/shared/ui/button/ActionButton';
import { useRef, useState } from 'react';
import InstagramIcon from '../../../../public/icons/instagram.svg';
import TikTokIcon from '../../../../public/icons/tiktok.svg';
import TwitterIcon from '../../../../public/icons/twitter.svg';
import YoutubeIcon from '../../../../public/icons/youtube.svg';
import { registerHostProfile } from '@/entities/host/model/api';

// types/profile.ts
export type SocialLinks = {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
};

export type ProfilePayload = {
  profileImage: string;
  nickname: string;
  popBadge: string[];
  tagline: string;
  aboutMe: string;
  socialLinks: SocialLinks;
  area: string;
  languages: string[];
  restaurantStyles: string[];
  flavorPreferences: string[];
  favoriteFood: string;
  signatureDish: string;
};

export default function HostProfile() {
  function onChange(value: string) {
    console.log(value);
  }

  const [profile, setProfile] = useState<ProfilePayload>({
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
    area: '',
    languages: [],
    restaurantStyles: [],
    flavorPreferences: [],
    favoriteFood: '',
    signatureDish: '',
  });

  function setPopBadge(badge: string) {
    setProfile((prev) => ({
      ...prev,
      popBadge: prev.popBadge.includes(badge)
        ? prev.popBadge.filter((el) => el !== badge) // 있으면 제거
        : [...prev.popBadge, badge],
    }));
  }

  function setLanguage(lan: string) {
    setProfile((prev) => ({
      ...prev,
      languages: prev.languages.includes(lan)
        ? prev.languages.filter((el) => el !== lan) // 있으면 제거
        : [...prev.languages, lan],
    }));
  }

  function setRestaurantStyles(res: string) {
    setProfile((prev) => ({
      ...prev,
      restaurantStyles: prev.restaurantStyles.includes(res)
        ? prev.restaurantStyles.filter((el) => el !== res) // 있으면 제거
        : [...prev.restaurantStyles, res],
    }));
  }

  function setFlavorPreferences(flavor: string) {
    setProfile((prev) => ({
      ...prev,
      flavorPreferences: prev.flavorPreferences.includes(flavor)
        ? prev.flavorPreferences.filter((el) => el !== flavor) // 있으면 제거
        : [...prev.flavorPreferences, flavor],
    }));
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string); // ✅ base64 문자열
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file); // ⭐ 핵심
    });
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 용량 제한 (선택)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지는 5MB 이하만 업로드 가능합니다.');
      return;
    }

    try {
      const imageUrl = await fileToBase64(file);

      setProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 실패');
    }
  }

  return (
    <div className="w-full grid flex-col gap-3">
      <header className="flex h-14">
        <div className="flex w-44 justify-between items-center">
          <button>
            <Image alt="bobmate" src={ArrowLeftIcon} width={11} height={11} />
          </button>
          <Text as="h1" color="text-[#020202]" weight="font-semibold" size="text-2xl">
            밥메이트 프로필
          </Text>
        </div>
      </header>
      <div className="h-auto grid">
        <div className="h-auto grid">
          <div className="h-40 grid items-center">
            <div className="flex text-md">
              <Text size="text-md" color="text-[#000000]" weight="font-semibold">
                프로필 사진
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="grid h-32">
              <Text size="text-sm" color="text-[#4B4B4B]">
                본인을 잘 나타내주는 이미지를 등록해주세요.
              </Text>
              <div className="w-20 h-20 relative">
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

                  {/* 파일 업로드 트리거 */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0"
                  >
                    <Image src={EditIcon} alt="프로필 이미지 수정" width={24} height={24} />
                  </button>

                  {/* 실제 파일 input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" grid items-center font- ">
            <div className="flex text-md">
              <Text size="text-md" color="text-[#000000]" weight="font-semibold">
                밥메이트 이름
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="grid ">
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
                0/20
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-[110%] h-2 bg-[#F3F3F5] relative left-[-16]" />
        <div className="grid h-auto">
          <div>
            <Text size="text-md" weight="font-semibod" color="text-[#000000]">
              나에 대한 정보
            </Text>
          </div>
          <div className="grid">
            <div className="flex">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                바이브 태그
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div>
              {VIBE_TAGS.map((tag) => (
                <div key={tag.name} className="inline-block mr-2.5 mb-2.5">
                  <TagButton
                    active={profile.popBadge.includes(tag.label) ? true : false}
                    onClick={setPopBadge}
                    name={tag.name}
                    label={tag.label}
                    emoji={tag.emoji}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                한 줄 바이브
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div>
              <Text size="text-sm" color="text-[#4B4B4B]">
                본인의 바이브를 잘 나타내주는 한 문장을 입력해주세요.
              </Text>
              <Text size="text-sm" color="text-[#4B4B4B]">
                예시) “대담한 맛, 대담한 우정”
              </Text>
            </div>
            <div className="grid ">
              <div className="relatvie">
                <span className="absolute left-4 ">❝</span>
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
              <span className="absolute right-7">❞</span>
              <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
                0/80
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid mb-6">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                밥메이트 소개
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="mb-4">
              <Text size="text-sm" color="text-[#4B4B4B]">
                본인의 스토리, 취향, 인삿말등을 자유롭게 입력해주세요.
              </Text>
            </div>
            <div className="grid ">
              <div className="w-full">
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
              </div>
              <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
                0/200
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                소셜미디어
              </Text>
            </div>
            <div className="mb-4">
              <Text size="text-sm" color="text-[#4B4B4B]">
                인스타그램, X, 유튜브 등 본인의 소셜미디어 링크를 입력해주세요.
              </Text>
            </div>
            <div className="grid ">
              <div className="w-full flex justify-between mb-2">
                <Image alt="bobmate 호스트 인스타그램" src={InstagramIcon} />
                <div className="w-[90%]">
                  <Input
                    label=""
                    name="밥메이트 이름"
                    type="text"
                    value={profile.socialLinks.instagram ?? ''}
                    error=""
                    placeHolder="소셜미디어 주소를 입력해주세요."
                    onChange={(value: string) =>
                      setProfile((prev) => ({
                        ...prev,
                        socialLinks: { instagram: value },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full flex justify-between mb-2">
                <Image alt="bobmate host youtube" src={YoutubeIcon} />
                <div className="w-[90%]">
                  <Input
                    label=""
                    name="밥메이트 이름"
                    type="text"
                    value={profile.socialLinks.youtube ?? ''}
                    error=""
                    placeHolder="소셜미디어 주소를 입력해주세요."
                    onChange={(value: string) =>
                      setProfile((prev) => ({
                        ...prev,
                        socialLinks: { youtube: value },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full flex justify-between mb-2">
                <Image alt="bobmate host Tiktok" src={TikTokIcon} />
                <div className="w-[90%]">
                  <Input
                    label=""
                    name="밥메이트 이름"
                    type="text"
                    value={profile.socialLinks.tiktok ?? ''}
                    error=""
                    placeHolder="소셜미디어 주소를 입력해주세요."
                    onChange={(value: string) =>
                      setProfile((prev) => ({
                        ...prev,
                        socialLinks: { tiktok: value },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full flex justify-between mb-2">
                <Image alt="bobmate host Twitter" src={TwitterIcon} />
                <div className="w-[90%]">
                  <Input
                    label=""
                    name="밥메이트 이름"
                    type="text"
                    value={profile.socialLinks.twitter ?? ''}
                    error=""
                    placeHolder="소셜미디어 주소를 입력해주세요."
                    onChange={(value: string) =>
                      setProfile((prev) => ({
                        ...prev,
                        socialLinks: { twitter: value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                지역
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="mb-4">
              <Text size="text-sm" color="text-[#4B4B4B]">
                자주 가는 동네와 도시를 입력해주세요. ex) 홍대 / 서울
              </Text>
            </div>
            <div className="grid ">
              <div className="w-full">
                <Input
                  label=""
                  name="밥메이트 이름"
                  type="text"
                  value={profile.area}
                  error=""
                  placeHolder="지역을 입력하세요"
                  onChange={(value: string) =>
                    setProfile((prev) => ({
                      ...prev,
                      area: value,
                    }))
                  }
                />
              </div>
              <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
                0/20
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                언어
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="grid ">
              {/* <div className="w-full">
                <Input
                  label=""
                  name="밥메이트 이름"
                  type="text"
                  value=""
                  error=""
                  placeHolder="언어를 선택해주세요"
                  onChange={onChange}
                />
              </div> */}
              <div className="my-4">
                <Text size="text-sm" color="text-[#4B4B4B]">
                  최대 5개까지 선택해주세요.
                </Text>
              </div>
              <div>
                {LANGUAGELIST.map((lan) => (
                  <div key={lan.id} className="inline-block mr-2.5 mb-2.5">
                    <CateButton
                      active={profile.languages.includes(lan.label) ? true : false}
                      onClick={setLanguage}
                      id={lan.id}
                      label={lan.label}
                      color={'text-[#4B4B4B]'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div>
            <Text size="text-md" weight="font-semibod" color="text-[#000000]">
              음식취향
            </Text>
          </div>
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                내 맛집 취향
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="grid ">
              <div className="my-4">
                <Text size="text-sm" color="text-[#4B4B4B]">
                  최대 3개까지 선택해주세요.
                </Text>
              </div>
              <div>
                {MOODTAG.map((mood) => (
                  <div key={mood.id} className="inline-block mr-2.5 mb-2.5">
                    <CateButton
                      active={profile.restaurantStyles.includes(mood.label) ? true : false}
                      onClick={setRestaurantStyles}
                      id={mood.id}
                      label={mood.label}
                      color={'text-[#4B4B4B]'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                좋아하는 맛
              </Text>
              <Text size="text-md" color="text-[#EF4040]">
                *
              </Text>
            </div>
            <div className="grid ">
              <div className="my-4">
                <Text size="text-sm" color="text-[#4B4B4B]">
                  최대 3개까지 선택해주세요.
                </Text>
              </div>
              <div>
                {TASTETAG.map((mood) => (
                  <div key={mood.id} className="inline-block mr-2.5 mb-2.5">
                    <CateButton
                      active={profile.flavorPreferences.includes(mood.label)}
                      onClick={setFlavorPreferences}
                      id={mood.id}
                      label={mood.label}
                      color={'text-[#4B4B4B]'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                즐겨찾는 음식
              </Text>
            </div>
            <div className="mb-4">
              <Text size="text-sm" color="text-[#4B4B4B]">
                예시) 수육, 족발, 참치찌개
              </Text>
            </div>
            <div className="grid ">
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
                0/20
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid">
          <div className="grid">
            <div className="flex mb-4">
              <Text size="text-md" color="text-[#000000]" weight="font-medium">
                시그니처 음식
              </Text>
            </div>
            <div className="mb-4">
              <Text size="text-sm" color="text-[#4B4B4B]">
                쿠킹클래스를 진행하는 호스트만 입력해주세요.
              </Text>
            </div>
            <div className="grid ">
              <div className="w-full">
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
              </div>
              <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-right">
                0/20
              </Text>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="my-6">
          <Text size="text-xs" weight="font-normal" color="text-[#A0A0A0]" align="text-left">
            *표시는 필수입력란입니다.
          </Text>
        </div>
        <div>
          <ActionButton
            name="프로필 저장"
            bgColor="bg-[#020202]"
            width="w-full"
            height="h-10"
            color="text-[#FFFFFF]"
            radius="rounded-md"
            weight="font-semibold"
            onClick={() => registerHostProfile(profile)}
          >
            프로필 저장하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
``;
