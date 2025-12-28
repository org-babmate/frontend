'use client';

import { cn } from '@/shared/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TimeOption {
  value: string;
  label: string;
}

interface TimeDropdownProps {
  value: string;
  onChange?: (value: string) => void;
  options: TimeOption[];
  disabled?: boolean;
  placeholder?: string;
}

export function TimeDropdown({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = '시간 선택',
}: TimeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm text-left',
          'focus:outline-none transition-all',
          disabled
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-black',
        )}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>

      {/* Dropdown Icon */}
      <span
        className={cn(
          'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      >
        <ChevronDown />
      </span>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
          style={{ top: '100%' }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full text-left px-4 py-2.5 text-sm transition-colors',
                'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                'first:rounded-t-xl last:rounded-b-xl',
                value === option.value && 'bg-gray-50 font-medium',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
