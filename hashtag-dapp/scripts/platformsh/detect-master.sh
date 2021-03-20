#!/bin/bash

# This script is used in platform.sh deployments during the build hook to determine
# if the build is taking place in the master branch (production) or any other branch (development).

# We need this to conditionally do a production build (yarn build) or a development
# build (yarn build --mode development).
#
# We do this so we can set the appropriate environment variable during node build.
# see .platform.app.yaml
#

echo "master"
