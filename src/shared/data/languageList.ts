export const LANGUAGELIST = [
  { id: 'en', label: '영어' },
  { id: 'ko', label: '한국어' },
  { id: 'ja', label: '일본어' },
  { id: 'zh', label: '중국어' },
  { id: 'vi', label: '베트남어' },
  { id: 'th', label: '태국어' },
  { id: 'es', label: '스페인어' },
  { id: 'it', label: '이탈리아어' },
  { id: 'fr', label: '프랑스어' },
  { id: 'ru', label: '러시아어' },
  { id: 'de', label: '독일어' },
  { id: 'ar', label: '아랍어' },
] as const;
export type Language = (typeof LANGUAGELIST)[number]['id'];
export type LanguageItem = (typeof LANGUAGELIST)[number];
