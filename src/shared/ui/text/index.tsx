// components/ui/Text.tsx
import { ReactNode } from 'react';
import clsx from 'clsx';

type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextProps = {
  children: ReactNode;
  as?: TextTag;
  color?: string;
  size?: string;
  weight?: string;
  align?: string;
  className?: string;
};

export default function Text({
  children,
  as = 'p',
  color = '',
  size = '',
  weight = '',
  align = '',
  className = '',
}: TextProps) {
  const Component = as;

  return (
    <Component className={`${color} ${size} ${weight} ${align} ${className}`}>{children}</Component>
  );
}
