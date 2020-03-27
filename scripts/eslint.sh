#!/bin/bash

# Intended to be run from the project (repository) root
# (eg. "./scripts/eslint.sh").

./.platform/local/deps/nodejs/node_modules/.bin/eslint --max-warnings 0 "$@" .
