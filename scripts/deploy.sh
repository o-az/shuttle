#!/usr/bin/env bash

set -eou pipefail

DENO_DEPLOY_TOKEN=$DENO_DEPLOY_TOKEN

if [ -z "$DENO_DEPLOY_TOKEN" ]; then
  echo "DENO_DEPLOY_TOKEN is not provided"
  exit 1
fi

# replace ENVIRONMENT="development" with ENVIRONMENT="production"
sed -i '' 's/ENVIRONMENT="development"/ENVIRONMENT="production"/g' .env
# replace BASE_URL="http://localhost:3034" with BASE_URL="https://shuttle.deno.dev"
sed -i '' 's/BASE_URL="http:\/\/localhost:3034"/BASE_URL="https:\/\/shuttle.deno.dev"/g' .env

deployctl deploy \
  --token="$DENO_DEPLOY_TOKEN" \
  --project="shuttle" \
  --prod \
  src/index.ts

# replace ENVIRONMENT="production" with ENVIRONMENT="development"
sed -i '' 's/ENVIRONMENT="production"/ENVIRONMENT="development"/g' .env
# replace BASE_URL="https://shuttle.deno.dev" with BASE_URL="http://localhost:3034"
sed -i '' 's/BASE_URL="https:\/\/shuttle.deno.dev"/BASE_URL="http:\/\/localhost:3034"/g' .env
