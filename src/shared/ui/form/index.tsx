'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface Props {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, error, children, className = '' }: Props) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && <label className="text-xs font-medium text-black">{label}</label>}

      {children}

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
