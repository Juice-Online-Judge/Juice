#!/bin/bash

url='https://circleci.com/api/v1/project/Sunday-Without-God/Juice/latest/artifacts/0/$CIRCLE_ARTIFACTS/bundle.tar.bz2?branch=master&filter=successful'

curl -o bundle.tar.bz2 "$url"

tar -jxvf bundle.tar.bz2 -C /var/www/html/

