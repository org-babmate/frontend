'use client';

import Badge from '@/shared/ui/badge';
import { ALL_LANGUAGES, Language, LANGUAGELIST } from '@/shared/data/languageList';

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
          <Badge
            key={item.id}
            content={item.labelEng} // 표시용
            selected={!isAllSelected && selected.includes(item.id)}
            onClick={() => handleToggleOne(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
