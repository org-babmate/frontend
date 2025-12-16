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

export default function HostProfile() {
  function onChange(value: string) {
    console.log(value);
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
                <div className="w-full h-full rounded-[100px] bg-[#F3F3F5]" />
                <Image
                  src={EditIcon}
                  alt="bobmate 호스트 프로필"
                  className="absolute bottom-1 right-[-3]"
                />
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
                value=""
                error=""
                placeHolder="활동할 밥메이트 이름을 입력해주세요."
                onChange={onChange}
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
                  <TagButton name={tag.name} label={tag.label} emoji={tag.emoji} />
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
                  value=""
                  error=""
                  placeHolder="한줄 바이브를 입력해주세요."
                  onChange={onChange}
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
                  value=""
                  error=""
                  placeHolder="소개글을 입력해주세요"
                  size="h-20"
                  onChange={onChange}
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
              <div className="w-full">
                <Input
                  label=""
                  name="밥메이트 이름"
                  type="text"
                  value=""
                  error=""
                  placeHolder="소셜미디어 주소를 입력해주세요."
                  onChange={onChange}
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
                  value=""
                  error=""
                  placeHolder="지역을 입력하세요"
                  onChange={onChange}
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
              <div className="w-full">
                <Input
                  label=""
                  name="밥메이트 이름"
                  type="text"
                  value=""
                  error=""
                  placeHolder="언어를 선택해주세요"
                  onChange={onChange}
                />
              </div>
              <div className="my-4">
                <Text size="text-sm" color="text-[#4B4B4B]">
                  최대 5개까지 선택해주세요.
                </Text>
              </div>
              <div>
                {LANGUAGELIST.map((lan) => (
                  <div key={lan.id} className="inline-block mr-2.5 mb-2.5">
                    <CateButton id={lan.id} label={lan.label} color={'text-[#4B4B4B]'} />
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
                    <CateButton id={mood.id} label={mood.label} color={'text-[#4B4B4B]'} />
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
                    <CateButton id={mood.id} label={mood.label} color={'text-[#4B4B4B]'} />
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
                  name="밥메이트 이름"
                  type="text"
                  value=""
                  error=""
                  placeHolder="즐겨찾는 음식을 입력해주세요."
                  onChange={onChange}
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
                  value=""
                  error=""
                  placeHolder="본인이 요리할 수 있는 시그니처 음식을 입력해주세요."
                  onChange={onChange}
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
          >
            프로필 저장하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
``;
