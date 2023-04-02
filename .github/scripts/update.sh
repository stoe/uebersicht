#!/usr/bin/env bash

set -eo pipefail

npx --no-install npm-check-updates -u -ws --root
npm install --ignore-scripts -ws --include-workspace-root
npm run format --if-present
npm run build --if-present
npm run test --if-present
