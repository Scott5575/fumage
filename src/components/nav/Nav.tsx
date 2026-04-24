import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/auth/actions";

export default async function Nav() {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-stone-800/60 bg-[#0c0906]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500">
            Fumage
          </span>
          <span className="text-stone-600 text-xs">·</span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500">
            The Gentleman&apos;s Atlas
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/fragrances"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/houses"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
          >
            Houses
          </Link>
          <Link
            href="/notes"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
          >
            Notes
          </Link>
          <form method="get" action="/search" className="flex items-center">
            <input
              type="search"
              name="q"
              placeholder="Search"
              className="w-24 bg-transparent border-b border-stone-800 focus:border-stone-600
                         text-stone-400 text-[10px] outline-none transition-colors
                         placeholder:text-stone-700 py-0.5"
            />
          </form>
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
              >
                Wardrobe
              </Link>
              <form action={signOut}>
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
              className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 hover:text-amber-400 transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
