export const CATEGORIES = [
  {
    label: 'All',
    value: 'all',
    icon: '',
  },
  { label: 'Pop-up kitchen', value: 'pop-up-kitchen', icon: '/categories/pop-up-kitchen.png' },
  { label: 'Hidden-gems', value: 'hidden-gems', icon: '/categories/hidden-gems.png' },
  { label: 'Cook together', value: 'cook-together', icon: '/categories/cook-together.png' },
  {
    label: 'Delivery & chill',
    value: 'delivery-and-chill',
    icon: '/categories/delivery-chill.png',
  },
  {
    label: 'Bite the streets',
    value: 'bite-the-streets',
    icon: '/categories/bite-the-streets.png',
  },
  { label: 'Snack attack', value: 'snack-attack', icon: '/categories/snack-attack.png' },
  {
    label: 'Cafe hop & chat',
    value: 'cafe-hop-and-chat',
    icon: '/categories/cafe-hop-chat.png',
  },
  { label: 'Mystery table', value: 'mystery-table', icon: '/categories/mystery-table.png' },
  {
    label: 'Picnic in the park',
    value: 'picnic-in-the-park',
    icon: '/categories/picnic-in-the-park.png',
  },
  { label: 'Late-night eats', value: 'late-night-eats', icon: '/categories/late-night-eats.png' },
  { label: 'Soju nights', value: 'soju-nights', icon: '/categories/soju-nights.png' },
  { label: 'Temple-taste', value: 'temple-taste', icon: '/categories/temple-taste.png' },

  {
    label: 'Veggie Vibes Only',
    value: 'veggie-vibes-only',
    icon: '/categories/veggie-vibes-only.png',
  },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];

export type CategoryLabel = (typeof CATEGORIES)[number]['value'];

const categoryLabelMap: Record<CategoryValue, string> = Object.fromEntries(
  CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<CategoryValue, string>;

export function getCategoryLabel(value: CategoryValue | string): string {
  if (value in categoryLabelMap) {
    return categoryLabelMap[value as CategoryValue];
  }
  return value;
}
