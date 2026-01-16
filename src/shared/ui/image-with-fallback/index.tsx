'use client';

import { cn } from '@/shared/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.svg',
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(
    typeof src === 'string' && src.trim() !== '' ? src : fallbackSrc,
  );

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      placeholder="blur"
      blurDataURL={fallbackSrc}
      className={cn(className, 'object-cover')}
    />
  );
}
