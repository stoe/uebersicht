#!/usr/bin/env zsh

set -eo pipefail

npx npm-check-updates --upgrade --workspaces --root

# packages
print -P "\n[ %5FUpdating packages%f ]"

npm install --ignore-scripts --workspace packages --include-workspace-root
npm run format --if-present
npm run build --if-present
npm run test --if-present
