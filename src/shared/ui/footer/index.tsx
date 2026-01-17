function Footer() {
  return (
    <footer className="flex flex-col px-4 py-15 space-y-9 text-label bg-background-subtle">
      <div className="flex flex-col gap-1">
        <span className="ty-body-1-semibold">Babmate</span>
        <span className="ty-label-1-medium text-label-subtle">Eat and make friends!</span>
      </div>
      <span className="ty-body-1-semibold">FAQ</span>
      <span className="ty-body-1-semibold">Contact us</span>
    </footer>
  );
}

export default Footer;
