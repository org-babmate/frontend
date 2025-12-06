'use client';

const GOOGLE_AUTH_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;

export function GoogleLoginButton() {
  const handleClick = async () => {
    window.location.href = GOOGLE_AUTH_URL
  };
  

  return (
    <button type="button" onClick={handleClick} className="w-full mt-2 bg-orange-300 text-gray-600 py-2 rounded-sm" >
      Continue with Google
    </button>
  );
}
