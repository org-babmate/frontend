export const MOODTAG = [
  { id: 'old_stall', label: '노포/할매집' },
  { id: 'street_food', label: '포장마차' },
  { id: 'hidden_gem', label: '숨은 골목 맛집' },
  { id: 'fine_dining', label: '심야식당' },
  { id: 'brunch', label: '브런치 맛집' },
  { id: 'hot_place', label: '요즘 핫플' },
  { id: 'retro', label: '레트로 감성' },
  { id: 'atmosphere', label: '분위기 맛집' },
  { id: 'omakase', label: '오마카세' },
  { id: 'artsy', label: '미술랭 식당' },
  { id: 'local', label: '현지 느낌' },
] as const;

export type MoodTag = (typeof MOODTAG)[number]['id'];
export type MoodTagItem = (typeof MOODTAG)[number];
