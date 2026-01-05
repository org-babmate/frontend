export const CATEGORIES = [
  { label: 'Pop-up kitchen', value: 'pop-up-kitchen' },
  { label: 'hidden-gems', value: 'hidden-gems' },
  { label: 'Cook together', value: 'cook-together' },
  { label: 'Delivery & chill', value: 'delivery-and-chill' },
  { label: 'Bite the streets', value: 'bite-the-streets' },
  { label: 'Snack attack', value: 'snack-attack' },
  { label: 'cafe hop & chat', value: 'cafe-hop-and-chat' },
  { label: 'mystery table', value: 'mystery-table' },
  { label: 'picnic in the park', value: 'picnic-in-the-park' },
  { label: 'late-night eats', value: 'late-night-eats' },
  { label: 'soju nights', value: 'soju-nights' },
  { label: 'temple-taste', value: 'temple-taste' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];

const categoryLabelMap: Record<CategoryValue, string> = Object.fromEntries(
  CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<CategoryValue, string>;

export function getCategoryLabel(value: CategoryValue): string {
  return categoryLabelMap[value];
}
