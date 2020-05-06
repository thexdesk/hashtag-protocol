#!/usr/bin/env php
<?php

/**
 * @file
 * Outputs the last SHA of a given pull request.
 *
 * Expects a Pull Request number to be passed as an argument when run.
 *
 * Expects the $GITHUB_OAUTH_TOKEN environment variable to be present and
 * hold a valid GitHub OAuth2 Token granting read access to the repo.
 *
 * Expects GitHub API configuration to be present in the following environment
 * variables:
 * -$GITHUB_API_BASE_URL
 * -$GITHUB_REPO_OWNER
 * -$GITHUB_REPO
 */

if (isset($argv[1]) && ctype_digit($argv[1])
  && ($github_api_base_url = getenv('GITHUB_API_BASE_URL'))
  && ($github_repo_owner = getenv('GITHUB_REPO_OWNER'))
  && ($github_repo = getenv('GITHUB_REPO'))) {
  $pr_number = $argv[1];
  if ($token = getenv('GITHUB_OAUTH_TOKEN')) {
    $url = "$github_api_base_url/repos/$github_repo_owner/$github_repo/pulls/$pr_number";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "Authorization: token $token",
      'User-Agent: CivicSolar-Automated-Testing',
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FAILONERROR, TRUE);
    $result = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    if ($result && !$error) {
      $pull_request = json_decode($result, TRUE);
      if (isset($pull_request['head']['sha'])) {
        echo $pull_request['head']['sha'];
        exit(0);
      }
    }
  }
}
exit(1);
