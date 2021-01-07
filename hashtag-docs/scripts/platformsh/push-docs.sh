#!/bin/bash

# Copy documents from hashtag-docs into a mounted
# network drive so they can be used in hashtag-dapp
# and hashtag-website.
# 
# NOTE: This script is ONLY run on platform.sh during
# post-deploy hook. @see .platform.app.yml
#
# For local development, we mimic the mounted network
# drive using .gitignored local directories.
#
# @see /hashtag-dapp/scripts/pull-docs.sh
# @see /hashtag-website/scripts/pull-docs.sh
#

# If we are building on platform.sh
if [ -d /app/.global ]; then

    # First clean out the old docs
    rm -rf /app/shared/docs
    mkdir /app/shared/docs

    # Copy everything over.
    cp -R /app/docs/shared/faqs/. /app/shared/docs/
    cp -R /app/docs/shared/help/. /app/shared/docs/
    cp -R /app/docs/shared/pdfs/. /app/shared/docs/

fi
