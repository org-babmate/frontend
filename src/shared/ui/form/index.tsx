'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, error, children, className = '' }: Props) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <label className="ty-body-2-semibold text-label">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
