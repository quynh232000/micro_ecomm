# Auth Service
curl -i -X POST http://localhost:8001/services/ \
  --data "name=auth-service" \
  --data "url=http://auth-service:5000"

curl -i -X POST http://localhost:8001/services/auth-service/routes \
  --data "paths[]=/auth"

# Product Service
curl -i -X POST http://localhost:8001/services/ \
  --data "name=product-service" \
  --data "url=http://product-service:5001"

curl -i -X POST http://localhost:8001/services/product-service/routes \
  --data "paths[]=/product"

# Cart Service
curl -i -X POST http://localhost:8001/services/ \
  --data "name=cart-service" \
  --data "url=http://cart-service:5002"

curl -i -X POST http://localhost:8001/services/cart-service/routes \
  --data "paths[]=/cart"

# Tương tự cho Order, Payment, Shipping, Notification, Review, Search