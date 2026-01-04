'use client';

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeHolder: string;
};

export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeHolder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor={name} className="text-body-xl text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
        className={` text-body-md  text-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-0 ${
          error && 'border border-red-500'
        }`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
