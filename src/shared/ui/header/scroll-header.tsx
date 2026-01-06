'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollDirection() {
  const lastScrollY = useRef(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // 위로 스크롤
      if (currentY < lastScrollY.current) {
        setShow(true);
      }
      // 아래로 스크롤 + 약간 내려갔을 때만
      else if (currentY > lastScrollY.current && currentY > 40) {
        setShow(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return show;
}
