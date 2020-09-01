#!/bin/bash

# Copy markdown documents from hashtag-docs into a mounted
# network drive so they can be used in hashtag-dapp.
#
# This script is run in platform.sh post-deploy hook.

# First clean out the old docs
rm -rf /app/network/docs/*

# Copy everything over.
cp -R /app/docs/guide/faqs/. /app/network/docs/
cp -R /app/docs/guide/help/. /app/network/docs/