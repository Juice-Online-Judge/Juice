#!/bin/bash

cd /var/www/html

php artisan migrate -n --force

