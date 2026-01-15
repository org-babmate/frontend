'use client';

import Badge from '@/shared/ui/badge';
import { ALL_LANGUAGES, Language, LANGUAGELIST } from '@/shared/data/languageList';
import { cn } from '@/shared/lib/utils';

interface LanguageFilterProps {
  selected: Language[]; // [] === All
  onChange: (selected: Language[]) => void;
}

export function toggleLanguage(selected: Language[], value: Language): Language[] {
  return selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
}

export function LanguageFilter({ selected, onChange }: LanguageFilterProps) {
  const isAllSelected = selected.length === ALL_LANGUAGES.length;

  const handleToggleAll = () => {
    onChange([]);
  };

  const handleToggleOne = (value: Language) => {
    const next = toggleLanguage(selected, value);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[16px] font-semibold">Language</h3>

      <div className="flex flex-wrap gap-3">
        <Badge content="All" selected={isAllSelected} onClick={handleToggleAll} />

        {LANGUAGELIST.map((item) => (
          <button
            key={item.id}
            onClick={() => handleToggleOne(item.id)}
            className={cn(
              'px-3 py-2 rounded-2 ty-label-1-medium font-medium whitespace-nowrap transition-colors border',
              !isAllSelected && selected.includes(item.id)
                ? 'bg-primary-normal text-white border-primary-normal'
                : 'bg-white text-label-subtle border-gray-200 hover:border-gray-300',
            )}
          >
            {item.labelEng}
          </button>
        ))}
      </div>
    </div>
  );
}
