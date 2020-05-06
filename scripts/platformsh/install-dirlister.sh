#!/bin/bash

# Set up DirectoryLister in the current directory if it's not already there.

dirlister_version="2.6.1"
dirlister_cache_dir="/app/private/deploy_cache/directory_lister"

if [ ! -f index.php ]; then
  dirlister="DirectoryLister-$dirlister_version"
  dirlister_cached="$dirlister_cache_dir/$dirlister"
  # Retrieve DirectoryLister if we don't already have a cached copy.
  if [ ! -d "$dirlister_cached" ]; then
    mkdir -p $dirlister_cache_dir
    curl -LsS https://github.com/DirectoryLister/DirectoryLister/archive/$dirlister_version.tar.gz | tar -xz -C $dirlister_cache_dir/
  fi
  cp -r $dirlister_cached/resources $dirlister_cached/index.php -t ./
  cp $dirlister_cached/resources/default.config.php ./resources/config.php
fi
