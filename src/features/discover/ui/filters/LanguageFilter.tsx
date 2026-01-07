'use client';

import Badge from '@/shared/ui/badge';
import { toggleInArray } from '@/shared/lib/utils';

interface LanguageFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const languages = [
  'en', // English
  'ko', // Korean
  'ja', // Japanese
  'zh', // Chinese
  'vi', // Vietnamese
  'th', // Thai
  'es', // Spanish
  'it', // Italian
  'fr', // French
  'ru', // Russian
  'de', // German
  'ar', // Arabic
];

export function LanguageFilter({ selected, onChange }: LanguageFilterProps) {
  const handleToggle = (value: string) => {
    if (value === 'All') {
      onChange(languages);
      return;
    }

    const newSelected = toggleInArray(selected, value);
    if (selected.includes('All')) {
      onChange([value]);
      return;
    }
    if (newSelected.length === 0) {
      onChange(languages);
      return;
    }
    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[16px] font-semibold">Language</h3>
      <div className="flex flex-wrap gap-3">
        <Badge
          content="All"
          selected={selected.includes('All')}
          onClick={() => handleToggle('All')}
        />
        {languages.map((lang) => (
          <Badge
            key={lang}
            content={lang}
            selected={selected.includes(lang)}
            onClick={() => handleToggle(lang)}
          />
        ))}
      </div>
    </div>
  );
}
