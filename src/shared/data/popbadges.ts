export type Popbadge = {
  name: string;
  label: string;
  emoji: string;
};

export const POPBADGES = [
  {
    name: 'spicy_lover',
    label: 'Spicy Lover',
    emoji: '🌶️',
  },
  {
    name: 'meat_eater',
    label: 'Meat Eater',
    emoji: '🍗',
  },
  {
    name: 'noodle_addict',
    label: 'Noodle Addict',
    emoji: '🍜',
  },
  {
    name: 'sweet_tooth',
    label: 'Sweet Tooth',
    emoji: '🧁',
  },
  {
    name: 'soju_expert',
    label: 'Soju Expert',
    emoji: '🍶',
  },
  {
    name: 'party_diner',
    label: 'Party Diner',
    emoji: '🕺',
  },
  {
    name: 'hnameden_gem_finder',
    label: 'Hnameden Gem Finder',
    emoji: '🏮',
  },
  {
    name: 'healthy_soul',
    label: 'Healthy Soul',
    emoji: '🥗',
  },
  {
    name: 'calm_foodie',
    label: 'Calm Foodie',
    emoji: '🧘',
  },
  {
    name: 'convenience_store_hunter',
    label: 'Convenience Store Hunter',
    emoji: '🏪',
  },
  {
    name: 'bold_food_explorer',
    label: 'Bold Food Explorer',
    emoji: '🔥',
  },
] as const satisfies readonly Popbadge[];

export type PopbadgeName = (typeof POPBADGES)[number]['name'];

export const POPBADGE_MAP = Object.fromEntries(
  POPBADGES.map((badge) => [badge.name, `${badge.emoji} ${badge.label}`]),
) as Record<string, string>;

export function getPopbadgeDisplay(badgeName: string) {
  return POPBADGE_MAP[badgeName] ?? badgeName;
}
