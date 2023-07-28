#!/usr/bin/env bash

set -eou pipefail

# Example insert new record

curl --silent --location \
  --request POST \
  --url 'http://localhost:3034/new' \
  --header 'Content-Type: application/json' \
  --data-raw '{ "hello": "world" }'
