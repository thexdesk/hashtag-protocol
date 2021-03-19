#!/bin/sh
JSON_STRING='window.configs = { \
  "VUE_APP_ONBOARD_NETWORK_ID":"'"${VUE_APP_ONBOARD_NETWORK_ID}"'", \
  "VUE_APP_HASHTAG_SUBGRAPH_URL":"'"${VUE_APP_HASHTAG_SUBGRAPH_URL}"'" \
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /app/build_platform/index.html
exec "$@"