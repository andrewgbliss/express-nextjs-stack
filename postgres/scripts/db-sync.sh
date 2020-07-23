#!/bin/bash
 
echo 'Syncing db'
time PGPASSWORD=$POSTGRES_PROD_PASSWORD pg_dump -h $POSTGRES_PROD_HOST -U $POSTGRES_PROD_USER -d myapp \
--clean \
--no-owner \
| \
PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d myapp

echo 'Finished Syncing db'