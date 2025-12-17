export const CATEGORIES = [
  { label: 'Pop-up kitchen', value: 'pop-up-kitchen' },
  { label: 'Eat like a local', value: 'hidden-gems' }, // (API가 hidden-gems라면)
  { label: 'Cook together', value: 'cook-together' },
  { label: 'Delivery & chill', value: 'delivery-and-chill' },
  { label: 'Bite the streets', value: 'bite-the-streets' },
  { label: 'Snack attack', value: 'snack-attack' },
  { label: 'cafe hop & chat', value: 'cafe-hop-and-chat' },
  { label: 'mystery table', value: 'mystery-table' },
  { label: 'picnic in the park', value: 'picnic-in-the-park' },
  { label: 'late-night eats', value: 'late-night-eats' },
  { label: 'soju nights', value: 'soju-nights' },
  { label: 'mindful eats', value: 'temple-taste' }, // mindful eats → temple-taste
  // mindful eats가 veggie로 가야하면 여기만 바꾸면 됨
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];
