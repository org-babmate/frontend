import Image from 'next/image';
import ArrowLeftIcon from '../../../../public/icons/arrow-left-icon.svg';
import Text from '@/shared/ui/text';
import ActionButton from '@/shared/ui/button/ActionButton';

// steps.ts
export const hostSteps = [
  {
    step: 1,
    title: '밥메이트 프로필 설정',
    description: '본인을 잘 나타내주는 이미지를 등록해주세요.',
  },
  {
    step: 2,
    title: '경험 만들기',
    description: '좋아하는 밥집, 카페, 장소 등을 기반으로 경험을 만들어주세요',
  },
  {
    step: 3,
    title: '정산',
    description: '일정금액이 모이면 정산받을 수 있어요',
  },
];

export default function HostMain() {
  return (
    <div className="w-full grid flex-col gap-3">
      <header className="flex h-14">
        <div className="flex w-44 justify-between items-center">
          <button>
            <Image alt="bobmate" src={ArrowLeftIcon} width={11} height={11} />
          </button>
          {/* <Text as="h1" color="text-[#020202]" weight="font-semibold" size="text-2xl">
            밥메이트 프로필
          </Text> */}
        </div>
      </header>
      <div className="grid">
        <div className="my-4">
          <Text
            as="h2"
            size="text-[var(--text-headline-md)]"
            color="texgt-[var(--color-gray-600)]"
            weight="font-[var(--text-headline-lg--font-weight)]"
          >
            밥메이트가 되어
          </Text>
          <Text
            as="h2"
            size="text-[var(--text-headline-md)]"
            color="text-[var(--color-gray-600)]"
            weight="font-[var(--text-headline-lg--font-weight)]"
          >
            외국인 친구를 사귀고 부수입을 올려보세요
          </Text>
        </div>
        <div className="my-4 w-[110%] h-44 relative left-[-16]">
          <div className=" w-[110%] h-full bg-[#EAEBEF]" />
        </div>
        <div className="my-6">
          <div>
            <Text
              as="h2"
              size="text-[var(--text-headline-md)]"
              color="text-[var(--color-gray-600)]"
              weight="font-[var(--text-headline-lg--font-weight)]"
            >
              어떻게 밥메이트가 되나요?
            </Text>
          </div>
          {hostSteps.map((host) => (
            <div className="my-4">
              <div className="flex items-center my-4">
                <div className="mr-2 text-center  w-4 h-4 rounded-2xl text-[var(--color-purewhite)] bg-[var(--color-gray-600)] flex items-center ">
                  <p className="mx-auto font-[var(--text-body-xl--font-weight) text-[var( --text-caption-md)]">
                    {host.step}
                  </p>
                </div>
                <Text
                  as="h3"
                  size="text-[var(--text-headline-md)]"
                  color="text-[var(--color-gray-600)]"
                  weight="font-[var(--text-headline-lg--font-weight)]"
                >
                  {host.title}
                </Text>
              </div>
              <div className="my-4">
                <Text
                  as="p"
                  size="text-[14px]"
                  color="text-[var(--color-gray-500)]"
                  weight="font-[var(--text-body-md--font-weight)]"
                >
                  {host.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
        <div className="my-6">
          <ActionButton
            name="밥메이트 시작하기"
            bgColor="bg-[#020202]"
            width="w-full"
            height="h-10"
            color="text-[#FFFFFF]"
            radius="rounded-md"
            weight="font-semibold"
            onClick={() => console.log('')}
          >
            밥메이트 시작하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
