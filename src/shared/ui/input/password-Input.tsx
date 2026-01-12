'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
};

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={`w-full px-4 py-3 pr-10 bg-white ring ring-gray-200 rounded-4 ty-body-2-regular ${className ?? ''}`}
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
