#!/bin/bash khởi tạo DB Postgres
docker exec -i $(docker ps -q -f name=postgres) psql -U root -d ecommerce < infra/docker/postgres/init.sql
echo "Postgres databases initialized."
