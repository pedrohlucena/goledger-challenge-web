import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HamburgerIcon } from "@/common/assets/svgs/hamburgerIcon";
import { NavbarSearchForm } from "@/components/navbarSearchForm";
import { WatchlistNavLink } from "@/components/watchlistNavLink";

function NavbarSearchFormFallback() {
  return (
    <div className="flex flex-1 min-w-0 h-9 rounded-sm overflow-hidden">
      <div className="bg-input-dark px-3 flex items-center text-white text-sm border-r border-subtle">
        Tudo
      </div>
      <div className="flex-1 bg-white" />
      <div className="bg-divider px-3 flex items-center" />
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="flex items-center bg-[var(--color-background)] h-14 px-4 gap-x-3 border-t-2 border-accent">
      <Link href="/" className="flex-shrink-0">
        <Image src="/logo.svg" alt="IMDp" width={64} height={32} />
      </Link>

      <button
        type="button"
        className="flex items-center gap-x-1.5 text-white text-sm font-medium px-2 py-1.5 hover:bg-edge rounded transition-colors flex-shrink-0 cursor-pointer"
      >
        <HamburgerIcon />
        Menu
      </button>

      <Suspense fallback={<NavbarSearchFormFallback />}>
        <NavbarSearchForm />
      </Suspense>

      <span className="flex items-center gap-x-5 flex-shrink-0 text-sm text-white">
        <WatchlistNavLink />

        <a href="" className="hover:text-accent transition-colors">Fazer login</a>
      </span>
    </nav>
  );
}
