import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/owner", label: "Owner" },
  { href: "/admin", label: "Admin" },
  { href: "/membership", label: "Membership" }
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-[#f7f1e8]/80 backdrop-blur-xl">
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl text-ink">
          Feel_Like_Home
        </Link>
        <nav className="hidden gap-6 text-sm font-semibold text-stone md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/owner"
          className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white"
        >
          List your asset
        </Link>
      </div>
    </header>
  );
}
