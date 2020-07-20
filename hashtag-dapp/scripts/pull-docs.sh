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

# If we are not building on platform.sh
if ! [ -d /app/.global ]; then
  # We are building locally, just copy right from the hashtag-docs folder.
  cp -R ./../hashtag-docs/docs/guide/faqs/. ./public/docs/
  cp -R ./../hashtag-docs/docs/guide/help/. ./public/docs/
fi
