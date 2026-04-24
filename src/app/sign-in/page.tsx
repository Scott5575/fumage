import Link from "next/link";
import { signIn } from "@/app/auth/actions";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { error, message } = await searchParams;

  return (
    <main className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-3">
            Fumage
          </p>
          <h1 className="text-2xl font-light text-stone-200">Sign in</h1>
        </div>

        {error && (
          <p className="text-red-400/90 text-xs text-center mb-6 border border-red-900/40 rounded px-4 py-3">
            {error}
          </p>
        )}
        {message && (
          <p className="text-stone-400 text-xs text-center mb-6 border border-stone-700/40 rounded px-4 py-3">
            {message}
          </p>
        )}

        <form action={signIn} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full bg-transparent border border-stone-700 focus:border-amber-500/70 rounded px-4 py-3 text-stone-200 text-sm outline-none transition-colors placeholder:text-stone-700"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border border-stone-700 focus:border-amber-500/70 rounded px-4 py-3 text-stone-200 text-sm outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 text-[10px] uppercase tracking-[0.25em] py-3.5 transition-colors mt-2 rounded"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-stone-600 text-xs mt-8">
          No account?{" "}
          <Link
            href="/sign-up"
            className="text-stone-400 hover:text-stone-200 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
