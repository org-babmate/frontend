export const SEOUL_LOCATIONS = [
  {
    id: 'Dongdaemun(DDP)',
    labelKo: '동대문(DDP)',
    labelEn: 'Dongdaemun(DDP)',
  },
  {
    id: 'Jamsil',
    labelKo: '잠실',
    labelEn: 'Jamsil',
  },
  {
    id: 'Euljiro',
    labelKo: '을지로',
    labelEn: 'Euljiro',
  },
  {
    id: 'Seochon(Gyeongbokgung)',
    labelKo: '서촌(경복궁)',
    labelEn: 'Seochon(Gyeongbokgung)',
  },
  {
    id: 'Gangnam',
    labelKo: '강남',
    labelEn: 'Gangnam',
  },
  {
    id: 'Hongdae',
    labelKo: '홍대',
    labelEn: 'Hongdae',
  },
  {
    id: 'Itaewon',
    labelKo: '이태원',
    labelEn: 'Itaewon',
  },
  {
    id: 'Myeongdong',
    labelKo: '명동',
    labelEn: 'Myeongdong',
  },
  {
    id: 'Seongsu',
    labelKo: '성수',
    labelEn: 'Seongsu',
  },
] as const;

export type SeoulLocation = (typeof SEOUL_LOCATIONS)[number]['id'];
export type SeoulLocationItem = (typeof SEOUL_LOCATIONS)[number];

export const ALL_SEOUL_LOCATIONS: readonly SeoulLocation[] = SEOUL_LOCATIONS.map((l) => l.id);

const SEOUL_LOCATION_KO_MAP: Record<SeoulLocation, string> = Object.fromEntries(
  SEOUL_LOCATIONS.map((l) => [l.id, l.labelKo]),
) as Record<SeoulLocation, string>;

export function getSeoulLocationKo(id: SeoulLocation): string {
  return SEOUL_LOCATION_KO_MAP[id];
}
