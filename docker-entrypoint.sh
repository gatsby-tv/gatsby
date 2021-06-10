#!/usr/bin/env sh
set -eu

envsubst '${PUBLIC_WESTEGG_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"
