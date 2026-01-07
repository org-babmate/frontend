export const LANGUAGELIST = [
  { id: 'en', label: '영어', labelEng: 'English' },
  { id: 'ko', label: '한국어', labelEng: 'Korean' },
  { id: 'ja', label: '일본어', labelEng: 'Japanese' },
  { id: 'zh', label: '중국어', labelEng: 'Chinese' },
  { id: 'vi', label: '베트남어', labelEng: 'Vietnamese' },
  { id: 'th', label: '태국어', labelEng: 'Thai' },
  { id: 'es', label: '스페인어', labelEng: 'Spanish' },
  { id: 'it', label: '이탈리아어', labelEng: 'Italian' },
  { id: 'fr', label: '프랑스어', labelEng: 'French' },
  { id: 'ru', label: '러시아어', labelEng: 'Russian' },
  { id: 'de', label: '독일어', labelEng: 'German' },
  { id: 'ar', label: '아랍어', labelEng: 'Arabic' },
] as const;

export type Language = (typeof LANGUAGELIST)[number]['id'];
export type LanguageItem = (typeof LANGUAGELIST)[number];

export const ALL_LANGUAGES: readonly Language[] = LANGUAGELIST.map((l) => l.id);
