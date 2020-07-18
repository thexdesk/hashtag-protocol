#!/bin/bash

# Copy markdown documents from hashtag-docs into 
# hashtag-dapp assets folder so they can be used in that app.
#
# Run this script locally from the hashtag-dapp root.
#
# eg. ./scripts/pull-docs/sh
#
# @see also /hashtag-docs/scripts/platform/push-docs.sh

# If we are building on platform.sh
if [ -d /app/.global ]; then
  # Copy documentation files from network drive to assets folder.
  cp -R /app/network/docs/. /app/public/docs/
  cp -R /app/network/docs/. /app/public/docs/
else
  # We are building locally, just copy right from the hashtag-docs folder.
  cp -R ./../hashtag-docs/docs/guide/faqs/. ./public/docs/
  cp -R ./../hashtag-docs/docs/guide/help/. ./public/docs/
fi
