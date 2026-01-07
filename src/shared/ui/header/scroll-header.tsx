'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollDirection() {
  const lastScrollY = useRef(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      lastScrollY.current = y;
      setShow(y <= 40); // 첫 상태를 스크롤 위치에 맞춤
    };

    sync();

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) setShow(true);
      else if (currentY > lastScrollY.current && currentY > 40) setShow(false);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return show;
}
