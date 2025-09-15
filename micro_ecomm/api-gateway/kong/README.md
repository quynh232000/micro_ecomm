# Khởi tạo DB Kong
docker-compose -f docker-compose.yml up -d
docker-compose exec kong kong migrations bootstrap

# API Gateway - Kong

## Cài đặt

1. Chạy database và Kong:

```bash
cd api-gateway/kong
docker-compose up -d
## Khởi tạo database Kong:
docker-compose exec kong kong migrations bootstrap

Kiểm tra gateway:

Proxy HTTP: http://localhost:8000

Admin API: http://localhost:8001