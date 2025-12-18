'use client';

import { Star } from 'lucide-react';
import { useId } from 'react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export function RatingStars({
  rating,
  size = 16,
  gap = 2,
  activeColor = '#000000',
  inactiveColor = '#EAEBEF',
}: RatingStarsProps) {
  const gradientId = useId();

  return (
    <div className="flex flex-row items-center" style={{ gap: `${gap}px` }}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={activeColor} />
            <stop
              offset="50%"
              stopColor={inactiveColor}
            />
          </linearGradient>
        </defs>
      </svg>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(rating);
        const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

        let fill = inactiveColor;
        let stroke = inactiveColor;

        if (isFull) {
            fill = activeColor;
            stroke = activeColor;
          } else if (isHalf) {
            fill = `url(#${gradientId})`;
            stroke = `url(#${gradientId})`;
          } else {
            fill = inactiveColor;
            stroke = inactiveColor;
          }

        return (
          <Star
            key={star}
            size={size}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
            className={
              ''
            }
          />
        );
      })}
    </div>
  );
}
