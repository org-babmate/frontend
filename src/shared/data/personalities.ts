export const PERSONALITYLIST = [
  { id: 'Extrovert', label: 'Extrovert' },
  { id: 'Introvert', label: 'Introvert' },
  { id: 'Enthusiastic', label: 'Enthusiastic' },
  { id: 'Caring', label: 'Caring' },
  { id: 'Cheerful', label: 'Cheerful' },
  { id: 'Optimistic', label: 'Optimistic' },
  { id: 'Etc', label: 'Etc' },
] as const;

export type Personality = (typeof PERSONALITYLIST)[number]['id'];
export type PersonalityItem = (typeof PERSONALITYLIST)[number];

export const ALL_PERSONALITIES: readonly Personality[] = PERSONALITYLIST.map((p) => p.id);

const PERSONALITY_MAP: Record<Personality, PersonalityItem> = Object.fromEntries(
  PERSONALITYLIST.map((p) => [p.id, p]),
) as Record<Personality, PersonalityItem>;

export function getPersonalityLabel(id: Personality): string {
  return PERSONALITY_MAP[id].label;
}
