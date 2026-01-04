export const SEOUL_LOCATIONS = [
  'Dongdaemun(DDP)',
  'Jamsil',
  'Euljiro',
  'Seochon(Gyeongbokgung)',
  'Gangnam',
  'Hongdae',
  'Itaewon',
  'Myeongdong',
  'Seongsu',
] as const;

export type SeoulLocation = (typeof SEOUL_LOCATIONS)[number];
