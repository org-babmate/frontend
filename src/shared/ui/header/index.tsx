import Link from "next/link";

function Header() {
  return (
    <header>
      <h1>Babmate</h1>
      <Link href={'/signIn'}>Sign In</Link>
    </header>
  );
}

export default Header;