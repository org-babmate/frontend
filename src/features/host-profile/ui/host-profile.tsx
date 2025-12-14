// import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import ArrowLeftIcon from '../../../../public/icons/arrow-left-icon.svg';
import Text from '@/shared/ui/text';
import EditIcon from '../../../../public/icons/edit.svg';
import { Input } from '@/shared/ui/input';
import { VIBE_TAGS } from '@/shared/data/VibeTag';
import TagButton from '@/shared/ui/button/TagButton';

export default function HostProfile() {
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
      <div className="h-72 grid">
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
        <div className="h-24 grid items-center font- ">
          <div className="flex text-md">
            <Text size="text-md" color="text-[#000000]" weight="font-semibold">
              밥메이트 이름
            </Text>
            <Text size="text-md" color="text-[#EF4040]">
              *
            </Text>
          </div>
          <div className="grid h-16">
            <Input
              label=""
              name="밥메이트 이름"
              type="text"
              value=""
              error=""
              placeHolder="활동할 밥메이트 이름을 입력해주세요."
              // onChange={() => console.log('fff')}
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
    </div>
  );
}
``;
