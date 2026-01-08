export const INTERESTLIST = [
  { id: 'music', label: 'Music' },
  { id: 'photos', label: 'Photos' },
  { id: 'games', label: 'Games' },
  { id: 'cafe', label: 'Cafe' },
  { id: 'local-food', label: 'LocalFood' },
  { id: 'street-food', label: 'StreetFood' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'art', label: 'Art' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'etc', label: 'Etc' },
] as const;

export type Interest = (typeof INTERESTLIST)[number]['id'];
export type InterestItem = (typeof INTERESTLIST)[number];

export const ALL_INTERESTS: readonly Interest[] = INTERESTLIST.map((i) => i.id);

const INTEREST_MAP: Record<Interest, InterestItem> = Object.fromEntries(
  INTERESTLIST.map((i) => [i.id, i]),
) as Record<Interest, InterestItem>;

export function getInterestLabel(id: Interest): string {
  return INTEREST_MAP[id].label;
}
