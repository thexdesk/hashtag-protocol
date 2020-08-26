#!/bin/bash

# Common functionality for running tests on Platform.sh

# Global config.
tests_started=$(date +%Y-%m-%d--%H-%M-%S)
environment_base_url="https://www---$PLATFORM_ENVIRONMENT-$PLATFORM_PROJECT.us.platform.sh"
push_statuses=1

##
 # Post a status to GitHub for a given commit SHA.
 #
 # @param string $1
 #   The state of the status.  Can be pending, success, error, or failure.
 #   Required.
 # @param string $2
 #   GitHub OAuth token.  Required.
 # @param string $3
 #   Commit SHA.  Required.
 # @param string $4
 #   The target URL to associate with this status.
 # @param string $5
 #   A short description of the status.
 # @param string $6
 #   A string label to differentiate this status from the statuses.
 ##
push_github_status () {
  # Do nothing if $push_statuses is false.
  if [ $push_statuses -eq 0 ]; then
    return 0
  fi

  # Ensure we have the required parameters.
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo 'Required arguments missing in push_github_status call.'
    return 1
  fi

  # Ensure we have the required GitHub API environment variables.
  if [ -z "$GITHUB_API_BASE_URL" ] || [ -z "$GITHUB_REPO_OWNER" ] || [ -z "$GITHUB_REPO" ]; then
    echo 'Required GitHub API environment variables are not set.'
    return 1
  fi

  # Build the json POST data.
  # state
  data="{ \"state\": \"$1\""
  # target_url
  if [ -z "$4" ]; then
    data="$data, \"target_url\": null"
  else
    data="$data, \"target_url\": \"$4\""
  fi
  # description
  if [ -z "$5" ]; then
    data="$data, \"description\": null"
  else
    data="$data, \"description\": \"$5\""
  fi
  # context
  if [ -z "$6" ]; then
    data="$data, \"context\": null"
  else
    data="$data, \"context\": \"$6\""
  fi
  data="$data }"

  # Send the status to GitHub.
  curl -sS -X POST -H "Authorization: token $2" -H 'Content-Type: application/json' -d "$data" $GITHUB_API_BASE_URL/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO/statuses/$3 > /dev/null

  # Check for and report if cURL didn't succeed.
  if [ $? -ne 0 ]; then
    echo 'Failed to push a status to GitHub.'
  fi
}

# Attempt to extract the PR number.  We only report back to GitHub for PRs.
regex="pr-([0-9]+).*"
if [[ $PLATFORM_ENVIRONMENT =~ $regex ]]; then
  pr_number=${BASH_REMATCH[1]}
  # Attempt to get the PR's latest SHA so we can send PR statuses to GitHub.
  pr_sha=$(/app/scripts/platformsh/current-pr-sha.sh $pr_number)
  if [ -z "$pr_sha" ]; then
    echo "Unable to determine PR's SHA.  GitHub status pushes will be skipped."
    push_statuses=0
  fi
else
  # Not a PR instance.  Don't push statuses.
  echo "Not a PR instance.  GitHub status pushes will be skipped."
  push_statuses=0
fi
