# 1. Chuyển vào folder k8s
cd ecommerce-microservices/infra/k8s

# 2. Apply Postgres
kubectl apply -f postgres/

# 3. Apply Redis
kubectl apply -f redis/

# 4. Apply Elasticsearch
kubectl apply -f elasticsearch/

# 5. Apply RabbitMQ
kubectl apply -f rabbitmq/

# 6. Apply Kong
kubectl apply -f kong/

# 7. Kiểm tra pods
kubectl get pods
kubectl get svc
kubectl get ingress
