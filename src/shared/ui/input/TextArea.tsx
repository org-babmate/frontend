'use client';

type TextAreaPropsType = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeHolder: string;
  size: string;
};

export default function TextArea({
  label,
  name,
  value,
  onChange,
  error,
  placeHolder,
  size,
}: TextAreaPropsType) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
        className={`${size} w-full text-body-md  text-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-0 ${
          error && 'border border-red-500'
        }`}
      />
    </div>
  );
}
