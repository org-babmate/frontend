export const INTERESTLIST = [
  { id: 'Music', label: 'Music' },
  { id: 'Photos', label: 'Photos' },
  { id: 'Games', label: 'Games' },
  { id: 'Cafe', label: 'Cafe' },
  { id: 'LocalFood', label: 'Local-Food' },
  { id: 'StreetFood', label: 'Street-Food' },
  { id: 'Dessert', label: 'Dessert' },
  { id: 'Art', label: 'Art' },
  { id: 'Fashion', label: 'Fashion' },
  { id: 'Etc', label: 'Etc' },
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
