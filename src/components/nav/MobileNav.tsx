"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import type { SessionUser } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/fragrances", label: "Catalog" },
  { href: "/houses", label: "Houses" },
  { href: "/notes", label: "Notes" },
  { href: "/dupes", label: "Dupes" },
  { href: "/clones", label: "Clones" },
  { href: "/layer", label: "Layer" },
  { href: "/guide", label: "Guide" },
];

export default function MobileNav({ user }: { user: SessionUser | null }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
      >
        {open ? (
          <>
            <span className="block w-5 h-px bg-stone-400 rotate-45 translate-y-[3px]" />
            <span className="block w-5 h-px bg-stone-400 -rotate-45 -translate-y-[3px]" />
          </>
        ) : (
          <>
            <span className="block w-5 h-px bg-stone-400" />
            <span className="block w-5 h-px bg-stone-400" />
            <span className="block w-5 h-px bg-stone-400" />
          </>
        )}
      </button>

      {open && (
        <div className="fixed top-14 inset-x-0 bg-[#0c0906] border-b border-stone-800 z-50 px-6 py-4">
          <nav className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors py-3 border-b border-stone-800/50 last:border-0"
              >
                {label}
              </Link>
            ))}

            <form method="get" action="/search" onSubmit={close} className="py-3 border-b border-stone-800/50">
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="w-full bg-transparent border-b border-stone-800 focus:border-stone-600
                           text-stone-400 text-[10px] outline-none transition-colors
                           placeholder:text-stone-700 py-0.5"
              />
            </form>

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={close}
                  className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors py-3 border-b border-stone-800/50"
                >
                  Wardrobe
                </Link>
                <form action={signOut} className="py-3">
                  <button
                    type="submit"
                    className="text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={close}
                className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 hover:text-amber-400 transition-colors py-3"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
