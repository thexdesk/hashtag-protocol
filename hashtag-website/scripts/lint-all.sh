#!/bin/bash

# Run all linters across the codebase.

# Intended to be run from the project (repository) root
# (eg. "./scripts/lint-all.sh").

./scripts/eslint.sh
exit_code=$?

./scripts/stylelint.sh
exit_code=$(($exit_code + $?))

exit $exit_code