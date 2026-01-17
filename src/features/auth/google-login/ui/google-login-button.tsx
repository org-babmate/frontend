'use client';

import Image from 'next/image';

const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;

export function GoogleLoginButton() {
  const handleClick = async () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center justify-center py-3 gap-2.5 rounded-2 ring ring-gray-200"
    >
      <Image src="/icons/google.svg" width={20} height={20} alt="google Icon" />
      Continue with Google
    </button>
  );
}
