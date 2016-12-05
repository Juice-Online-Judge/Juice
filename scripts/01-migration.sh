#!/bin/bash

cd /var/www/html

until mysqladmin -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" version; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Database is up - start migration"

php artisan migrate -n --force

