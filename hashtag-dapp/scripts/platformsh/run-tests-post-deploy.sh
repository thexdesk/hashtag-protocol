#!/bin/bash

# Run code-quality and automated tests on Platform.sh Pull Request environments.

# Import functionality common to all tests.
. /app/scripts/platformsh/tests-common.sh

# Behat config.
behat_context="cs/behat"
behat_temp_test_result_dir="/app/web/sites/default/test-results/$behat_context/local"
behat_test_result_dir="/app/web/sites/default/test-results/$behat_context/$PLATFORM_ENVIRONMENT/$tests_started"
behat_test_result_target_url="$environment_base_url/sites/default/test-results/$behat_context/?dir=$PLATFORM_ENVIRONMENT/$tests_started"

# --START Behat--
# Send pending status to GitHub.
push_github_status 'pending' "$GITHUB_OAUTH_TOKEN" "$pr_sha" "" 'Testing functionality...' "$behat_context"

# Set up the temporary test result directory structure.  This is where the HTML
# output is configured to land, so we'll just drop everything in here and move
# it into the $behat_test_result_dir position at test completion.
mkdir -p $behat_temp_test_result_dir
# Set up the parents of the final test result directory.
mkdir -p $behat_test_result_dir
rmdir $behat_test_result_dir

# Execute Behat functionality tests.
cd /app
./scripts/behat.sh --suite=drupal -f html -f pretty > "$behat_temp_test_result_dir/result.txt"

# Store and report the result.
if [ $? -eq 0 ]; then
  behat_test_result_state='success'
  behat_test_result_description='All functional tests passed!'
else
  behat_test_result_state='failure'
  behat_test_result_description='Some functional tests failed.'
fi
echo $behat_test_result_description

mv $behat_temp_test_result_dir $behat_test_result_dir

# Ensure we can browse the results directory.
cd /app/web/sites/default/test-results/$behat_context
/app/scripts/platformsh/install-dirlister.sh

# Send final status to GitHub.
push_github_status "$behat_test_result_state" "$GITHUB_OAUTH_TOKEN" "$pr_sha" "$behat_test_result_target_url" "$behat_test_result_description" "$behat_context"
# --END Behat--
