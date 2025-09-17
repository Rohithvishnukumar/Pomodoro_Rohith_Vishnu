#!/bin/sh
# wait-for-db.sh
# Usage: expects HOST_DB, USER_DB, PASSWORD_DB, DATABASE_DB env vars set

HOST="${HOST_DB:-localhost}"
USER="${USER_DB:-root}"
PASS="${PASSWORD_DB:-}"
RETRIES=30
SLEEP=2

echo "Waiting for MySQL at ${HOST} ..."

i=0
while [ $i -lt $RETRIES ]; do
  # mysqladmin will return 0 if server is up
  if mysqladmin ping -h "$HOST" -u"$USER" -p"$PASS" --silent; then
    echo "MySQL is up!"
    # Start the app (exec replaces shell so signals propagate to Node)
    exec node index.js
  fi
  i=$((i+1))
  echo "MySQL not ready yet (attempt $i/$RETRIES). Sleeping ${SLEEP}s..."
  sleep $SLEEP
done

echo "ERROR: MySQL did not become ready in time (host=${HOST}). Exiting."
exit 1
