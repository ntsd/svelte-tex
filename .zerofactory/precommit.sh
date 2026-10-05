#!/usr/bin/env bash
# Zero Factory precommit script — ntsd/svelte-tex
#
# Deterministically verifies format -> build -> test before the dispatcher
# commits a worktree branch and opens a PR.
#
# Usage:
#   .zerofactory/precommit.sh [all|format|build|test|install-hook]
#
# Tooling (from package.json scripts):
#   - format: prettier --plugin-search-dir . --write .
#   - build:  svelte-kit sync && svelte-package -o package (npm run build)
#   - test:   npx vitest run (one-shot, non-watch form of `npm test`)

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

run_format() {
  echo "▶ Zero Factory precommit: format & lint (prettier)"
  npm run format
}

run_build() {
  echo "▶ Zero Factory precommit: build (svelte-kit sync + svelte-package)"
  npm run build
}

run_test() {
  echo "▶ Zero Factory precommit: test (vitest run)"
  npx vitest run
}

install_hook() {
  HOOK_DIR="$(git rev-parse --git-path hooks 2>/dev/null || echo ".git/hooks")"
  mkdir -p "$HOOK_DIR"
  # Relative links break in linked worktrees (.git is a file, hooks live in
  # the primary tree) — use an absolute link to this script instead.
  ln -sf "$ROOT_DIR/.zerofactory/precommit.sh" "$HOOK_DIR/pre-commit"
  chmod +x "$HOOK_DIR/pre-commit"
  echo "✓ Linked .zerofactory/precommit.sh -> $HOOK_DIR/pre-commit"
}

case "${1:-all}" in
  format)       run_format ;;
  build)        run_build ;;
  test)         run_test ;;
  install-hook) install_hook ;;
  all|*)
    run_format
    run_build
    run_test
    ;;
esac

echo "✓ Zero Factory precommit checks passed!"
