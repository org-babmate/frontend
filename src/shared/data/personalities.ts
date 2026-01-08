export const PERSONALITYLIST = [
  { id: 'extrovert', label: 'Extrovert' },
  { id: 'introvert', label: 'Introvert' },
  { id: 'enthusiastic', label: 'Enthusiastic' },
  { id: 'caring', label: 'Caring' },
  { id: 'cheerful', label: 'Cheerful' },
  { id: 'optimistic', label: 'Optimistic' },
  { id: 'etc', label: 'Etc' },
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
