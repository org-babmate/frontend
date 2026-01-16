'use client';

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  max?: number;
  placeHolder: string;
};

export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  max,
  placeHolder,
}: InputProps) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label htmlFor={name} className="text-body-xl text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeHolder}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
        className={`ty-body-1-regular rounded-md bg-gray-50 px-3 py-2 text-gray-600 focus:ring-0 focus:outline-none ${
          error && 'border border-red-500'
        }`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
