'use client';

export type RadioOption<T extends string> = {
  label: string;
  value: T;
};

type RadioGroupProps<T extends string> = {
  value: T;
  options: readonly RadioOption<T>[];
  onChange: (value: T) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function RadioGroup<T extends string>({
  value,
  options,
  onChange,
  name = 'radio-group',
  disabled = false,
  className = '',
}: RadioGroupProps<T>) {
  return (
    <fieldset className={className} disabled={disabled}>
      <div className="flex gap-6">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="inline-flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-black disabled:opacity-50"
            />
            <span className="text-sm text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
