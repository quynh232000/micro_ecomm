#!/bin/bash

# Địa chỉ Kong Admin
KONG_ADMIN_URL="http://localhost:8001"

echo "=== Setting up Kong routes for microservices ==="

# Function tạo service + route
create_service_route() {
  local SERVICE_NAME=$1
  local SERVICE_URL=$2
  local ROUTE_PATH=$3

  echo "--- Creating service: $SERVICE_NAME at $SERVICE_URL ---"

  # Tạo service
  curl -s -X POST $KONG_ADMIN_URL/services/ \
    --data "name=$SERVICE_NAME" \
    --data "url=$SERVICE_URL" | jq .

  # Tạo route
  curl -s -X POST $KONG_ADMIN_URL/services/$SERVICE_NAME/routes \
    --data "paths[]=$ROUTE_PATH" | jq .

  echo "--- Route $ROUTE_PATH -> $SERVICE_NAME created ---"
  echo ""
}

# --- Microservices mapping ---
create_service_route "auth-service" "http://auth-service:5000" "/auth"
create_service_route "product-service" "http://product-service:5001" "/product"
create_service_route "cart-service" "http://cart-service:5002" "/cart"
create_service_route "order-service" "http://order-service:5003" "/order"
create_service_route "payment-service" "http://payment-service:5004" "/payment"
create_service_route "shipping-service" "http://shipping-service:5005" "/shipping"
create_service_route "notification-service" "http://notification-service:5006" "/notification"
create_service_route "review-service" "http://review-service:5007" "/review"
create_service_route "search-service" "http://search-service:5008" "/search"

echo "=== All routes setup complete! ==="


# bash infra/scripts/setup-full-stack.sh    # Chạy tất cả container và init DB
# bash infra/scripts/setup-kong-routes.sh  # Tạo tất cả service + route trên Kong