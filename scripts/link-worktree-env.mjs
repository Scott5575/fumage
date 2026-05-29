#!/usr/bin/env node
/**
 * link-worktree-env.mjs
 *
 * Git worktrees do not inherit the main checkout's untracked `.env.local`, so
 * `next dev` in a worktree crashes (Supabase client gets undefined URL/key).
 *
 * This script links the worktree's `.env.local` to the canonical one in the
 * main checkout so local development "just works" in any worktree. It is wired
 * to the `predev` npm hook, so it runs automatically before every `npm run dev`.
 *
 * Design guarantees:
 *  - No-op in the main checkout (canonical root === current root).
 *  - No-op if a `.env.local` is already present in the current root.
 *  - Never throws: any failure logs a warning and exits 0, so `dev` is never
 *    blocked. (The dev server will surface the missing-env error itself.)
 *  - Hooked to `predev` only, never `prebuild`, so production builds on Vercel
 *    — which inject env vars from the dashboard and have no `.env.local` — are
 *    never touched.
 */

import { execSync } from "node:child_process";
import { existsSync, lstatSync, symlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const ENV_FILE = ".env.local";

function main() {
  const currentRoot = process.cwd();

  // Locate the canonical checkout via the shared git directory. In a worktree,
  // --git-common-dir resolves to the main checkout's `.git`; its parent is the
  // main working tree root. In the main checkout it resolves to `.git` directly.
  let commonDir;
  try {
    commonDir = execSync("git rev-parse --git-common-dir", {
      cwd: currentRoot,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    // Not a git repo (or git unavailable) — nothing to link.
    return;
  }

  // Resolve commonDir relative to currentRoot if git returned a relative path.
  const absoluteCommonDir = commonDir.startsWith("/")
    ? commonDir
    : join(currentRoot, commonDir);
  const canonicalRoot = dirname(absoluteCommonDir);

  // In the main checkout there is nothing to do.
  if (canonicalRoot === currentRoot) return;

  const target = join(currentRoot, ENV_FILE);
  const source = join(canonicalRoot, ENV_FILE);

  // Respect an existing env file or link in this worktree.
  try {
    lstatSync(target);
    return; // something is already there — leave it alone
  } catch {
    // not present — proceed
  }

  if (!existsSync(source)) {
    console.warn(
      `[link-worktree-env] No ${ENV_FILE} found at ${source}; skipping. ` +
        `Create one in the main checkout to enable worktree dev.`
    );
    return;
  }

  try {
    symlinkSync(relative(currentRoot, source), target);
    console.log(`[link-worktree-env] Linked ${ENV_FILE} -> ${source}`);
  } catch (err) {
    console.warn(`[link-worktree-env] Could not link ${ENV_FILE}: ${err.message}`);
  }
}

main();
