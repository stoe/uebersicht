#!/usr/bin/env zsh

set -eo pipefail

npx --no-install npm-check-updates -u -ws --root

# packages
print -P "\n[ %5FUpdating packages%f ]"

npm install --ignore-scripts -ws --include-workspace-root
npm run format --if-present
npm run build --if-present
npm run test --if-present

# archived packages
pushd archived/vartastorage
  print -P "\n[ %5FUpdating archived/vartastorage%f ]"

  npx --no-install npm-check-updates -u
  npm install --ignore-scripts
  npm run format --if-present
  npm run build --if-present
  npm run test --if-present
popd
