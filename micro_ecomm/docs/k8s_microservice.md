# apply toàn bộ microservice
cd ecommerce-microservices/infra/k8s/microservices

# Apply tất cả microservice
kubectl apply -f .

K8s sẽ tạo Deployment + Service + Ingress cho tất cả microservice.

Các service sẽ kết nối Postgres, Redis, Elasticsearch, RabbitMQ qua ClusterIP service name (postgres, redis, …).

Kiểm tra toàn bộ stack
kubectl get pods
kubectl get svc
kubectl get ingress
kubectl logs <pod-name>

truy cập API qua Kong Ingress:

curl http://<KONG-LOADBALANCER-IP>/auth/login
curl http://<KONG-LOADBALANCER-IP>/product/list
curl http://<KONG-LOADBALANCER-IP>/cart

✅ Kết quả

Toàn bộ microservice được deploy end-to-end trên Kubernetes.

Kong Gateway route tất cả service theo đường dẫn /auth, /product, /cart, …

Các service kết nối infra (Postgres, Redis, Elasticsearch, RabbitMQ) qua service name.

Bạn có thể mở rộng replicas, scaling, hoặc thêm config cho production (PVC cho DB, secrets, configMap…).