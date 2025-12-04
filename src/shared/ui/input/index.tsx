'use client';

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-sm text-gray-800">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
