'use client';

import { Star } from 'lucide-react';
import { useId } from 'react';

type CommonProps = {
  size?: number;
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  disabled?: boolean;
};

type ViewProps = CommonProps & {
  rating: number; // 표시용 (소수 허용)
  onChange?: never; // 표시용에서는 금지
  value?: never;
  allowClear?: never;
};

type InputProps = CommonProps & {
  value: number; // 입력용 (보통 정수)
  onChange: (v: number) => void; // 클릭 가능
  allowClear?: boolean; // 같은 별 다시 누르면 0점
  rating?: never;
};

type RatingStarsProps = ViewProps | InputProps;

export function RatingStars(props: RatingStarsProps) {
  const gradientId = useId();

  const size = props.size ?? 16;
  const gap = props.gap ?? 2;
  const activeColor = props.activeColor ?? '#000000';
  const inactiveColor = props.inactiveColor ?? '#EAEBEF';
  const className = props.className ?? '';
  const disabled = props.disabled ?? false;

  const interactive = 'onChange' in props;

  let displayValue: number;
  if (interactive) {
    displayValue = props.value ?? 0;
  } else {
    displayValue = props.rating;
  }

  return (
    <div className={`flex flex-row items-center ${className}`} style={{ gap }}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={activeColor} />
            <stop offset="50%" stopColor={inactiveColor} />
          </linearGradient>
        </defs>
      </svg>

      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(displayValue);
        const isHalf = star === Math.ceil(displayValue) && displayValue % 1 !== 0;

        let fill = inactiveColor;
        let stroke = inactiveColor;

        if (isFull) {
          fill = activeColor;
          stroke = activeColor;
        } else if (isHalf) {
          fill = `url(#${gradientId})`;
          stroke = `url(#${gradientId})`;
        }

        const icon = <Star size={size} fill={fill} stroke={stroke} strokeWidth={2} />;

        if (!interactive) {
          return <span key={star}>{icon}</span>;
        }

        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled || !props.onChange) return;
              const next = props.allowClear && star === props.value ? 0 : star;
              props.onChange(next);
            }}
            className={`p-0.5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
