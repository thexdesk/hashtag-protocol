#!/bin/bash

# Run code-quality and automated tests on Platform.sh Pull Request environments.

# All output from this script is saved to /var/log/deploy.log

# Import functionality common to all tests.
. /app/scripts/platformsh/tests-common.sh

# ESLint config.
eslint_context="eslint"
eslint_test_result_dir="/app/build_platform/test-results/$eslint_context/$PLATFORM_ENVIRONMENT/$tests_started"
eslint_test_result_target_url="$environment_base_url/test-results/$eslint_context/?dir=$PLATFORM_ENVIRONMENT/$tests_started"

# Sass Lint config.
#sasslint_context="cs/sass-lint"
#sasslint_test_result_dir="/app/web/sites/default/test-results/$sasslint_context/$PLATFORM_ENVIRONMENT/$tests_started"
#sasslint_test_result_target_url="$environment_base_url/sites/default/test-results/$sasslint_context/?dir=$PLATFORM_ENVIRONMENT/$tests_started"

# stylelint config.
#stylelint_context="cs/stylelint"
#stylelint_test_result_dir="/app/web/sites/default/test-results/$stylelint_context/$PLATFORM_ENVIRONMENT/$tests_started"
#stylelint_test_result_target_url="$environment_base_url/sites/default/test-results/$stylelint_context/?dir=$PLATFORM_ENVIRONMENT/$tests_started"

# --START ESLint--
# Send pending status to GitHub.
push_github_status 'pending' "$GITHUB_OAUTH_TOKEN" "$pr_sha" "" 'Linting JavaScript...' "$eslint_context"

# Set up test result directory structure.
mkdir -p $eslint_test_result_dir

# Execute ESLint JS code-quality tests.
cd /app
eslint --max-warnings 0 . > $eslint_test_result_dir/eslint-output.txt

# Store and report the result.
if [ $? -eq 0 ]; then
  eslint_test_result_state='success'
  eslint_test_result_description='All JavaScript adheres to Drupal coding standards!'
else
  eslint_test_result_state='failure'
  eslint_test_result_description='Some JavaScript does not adhere to Drupal coding standards.'
fi
echo $eslint_test_result_description

# Ensure we can browse the results directory.
cd /app/web/sites/default/test-results/$eslint_context
/app/scripts/platformsh/install-dirlister.sh

# Send final status to GitHub.
push_github_status "$eslint_test_result_state" "$GITHUB_OAUTH_TOKEN" "$pr_sha" "$eslint_test_result_target_url" "$eslint_test_result_description" "$eslint_context"
# --END ESLint--
