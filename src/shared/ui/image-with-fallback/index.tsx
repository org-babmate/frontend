'use client';

import { useState, ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = 'https://via.placeholder.com/150?text=No+Image',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    (typeof src === 'string' && src.trim() !== '') ? src : fallbackSrc
  );

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
