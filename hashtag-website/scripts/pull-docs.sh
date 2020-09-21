#!/bin/bash

# Copy markdown documents from hashtag-docs into 
# hashtag-dapp public/docs folder so they can be
# used in that app during development.
#
# Run this script locally from the hashtag-dapp root.
#
# eg. cd /hashtag-protocol/hashtag-dapp
#     ./scripts/pull-docs.sh
#
# @see also /hashtag-docs/scripts/platform/push-docs.sh

# If we are NOT building on platform.sh
if ! [ -d /app/.global ]; then

  # We are building locally. First clean out the old docs.
  rm -rf ./public/docs/*

  # Copy shared assets right from the hashtag-docs folder.
  cp -R ./../hashtag-docs/docs/guide/faqs/. ./public/docs/
  cp -R ./../hashtag-docs/docs/guide/help/. ./public/docs/
  cp -R ./../hashtag-docs/docs/guide/pdfs/. ./public/docs/

fi
