#!/bin/bash

# Intended to be run from the project (repository) root
# (eg. "./scripts/stylelint.sh").

# @todo Fail on warnings too.  Waiting on the command line option to merge in:
# @see https://github.com/stylelint/stylelint/pull/2942

./.platform/local/deps/nodejs/node_modules/.bin/stylelint --config-basedir ./.platform/local/deps/nodejs/node_modules/ "$@" "src/**"
