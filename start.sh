#!/bin/sh
set -e

# Run migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Running migrations..."
  # Check if it's a sqlite database and the directory exists
  case "$DATABASE_URL" in
    file:*)
      DB_PATH=$(echo "$DATABASE_URL" | sed 's/file://')
      DB_DIR=$(dirname "$DB_PATH")
      if [ ! -d "$DB_DIR" ]; then
        echo "Creating database directory: $DB_DIR"
        mkdir -p "$DB_DIR"
      fi
      ;;
  esac
  
  ./node_modules/.bin/prisma migrate deploy
fi

# Start the app
echo "Starting app..."
node build
