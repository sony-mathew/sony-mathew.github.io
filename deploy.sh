#!/bin/bash
set -euo pipefail

# Build from the checked-out source without switching or committing that branch.
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"
npm --prefix site run export

# Publish only the exported files. Keep deployment changes isolated from source
# files and preserve existing files such as CNAME on the deployment branch.
git fetch origin deploy
deployment_dir=$(mktemp -d "${TMPDIR:-/tmp}/sony-site-deploy.XXXXXX")
trap 'git worktree remove --force "$deployment_dir" 2>/dev/null || rmdir "$deployment_dir" 2>/dev/null || true' EXIT
git worktree add --detach "$deployment_dir" origin/deploy
cp -R site/out/. "$deployment_dir/"
git -C "$deployment_dir" add --all

if git -C "$deployment_dir" diff --cached --quiet; then
  echo "The exported site is already up to date."
  exit 0
fi

git -C "$deployment_dir" commit -m "Deploy: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
git -C "$deployment_dir" push origin HEAD:deploy
