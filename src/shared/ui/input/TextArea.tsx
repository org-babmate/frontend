'use client';

type TextAreaPropsType = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeHolder: string;
  size: string;
  max: number;
};

export default function TextArea({
  label,
  name,
  value,
  onChange,
  error,
  placeHolder,
  size,
  max,
}: TextAreaPropsType) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
        className={`${size} text-body-md w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600 focus:ring-0 focus:outline-none ${
          error && 'border border-red-500'
        }`}
      />
    </div>
  );
}
