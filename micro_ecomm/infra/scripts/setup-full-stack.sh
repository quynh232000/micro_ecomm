#!/bin/bash
cd infra/docker
docker-compose up -d
echo "Waiting 10s for infra services..."
sleep 10

# Khởi tạo Postgres
bash ../scripts/init-db.sh

echo "Full stack started!"
echo "Check Kong Admin: http://localhost:8001"
echo "Check Elasticsearch: http://localhost:9200"
echo "Check RabbitMQ: http://localhost:15672"