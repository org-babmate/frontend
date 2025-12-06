'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입부터</Link>
    </div>
  );
}
