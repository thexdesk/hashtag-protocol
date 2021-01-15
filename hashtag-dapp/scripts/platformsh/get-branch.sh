#! /usr/bin/env bash
${PLATFORM_APP_DIR}/.platformsh/bin/platform p:curl -X GET activities | \
  ${PLATFORM_APP_DIR}/jq -r \
  --arg tree ${PLATFORM_TREE_ID:0:7} \
  --arg app ${PLATFORM_APPLICATION_NAME} \
  '.[0].parameters.environment'