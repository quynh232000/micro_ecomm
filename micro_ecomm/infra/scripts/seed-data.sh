#!/bin/bash khởi động toàn bộ stack
cd infra/docker
docker-compose up -d
echo "Waiting 10s for services to start..."
sleep 10
bash ../scripts/init-db.sh
echo "Infra setup complete!"
