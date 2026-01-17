export const TASTETAG = [
  { id: 'spicy_hot', label: '화끈매운' },
  { id: 'spicy_numbing', label: '얼얼한' },
  { id: 'smoky', label: '불맛좋아' },
  { id: 'meat_lover', label: '고기없인못살아' },
  { id: 'juicy', label: '육즙폭발' },
  { id: 'rich_soup', label: '진한국물파' },
  { id: 'clean_soup', label: '깔끔국물파' },
  { id: 'hot_soup', label: '얼큰국물' },
  { id: 'cool_spicy', label: '시원칼칼' },
  { id: 'umami_bomb', label: '감칠폭발' },
  { id: 'sweet_salty', label: '단짠단짠' },
  { id: 'savory_fan', label: '구수덕후' },
  { id: 'thick_flavor', label: '진득한맛' },
  { id: 'mild', label: '순한맛파' },
  { id: 'light_clean', label: '깔끔단백' },
  { id: 'soft', label: '부드러운맛' },
  { id: 'old_style', label: '할매입맛' },
  { id: 'sweet', label: '달달파' },
  { id: 'sour_fresh', label: '새콤상큼' },
  { id: 'fresh_clean', label: '산뜻깔끔' },
  { id: 'veggie_lover', label: '채소러버' },
] as const;

export type TasteTag = (typeof TASTETAG)[number]['id'];
export type TasteTagItem = (typeof TASTETAG)[number];
