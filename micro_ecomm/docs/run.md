# Kiểm tra các container
docker ps

# Kiểm tra Kong Admin
curl http://localhost:8001/

# Kiểm tra Elasticsearch
curl http://localhost:9200/

# Kiểm tra Redis
docker exec -it <redis_container_id> redis-cli ping

# Kiểm tra RabbitMQ Management UI
# Mở trình duyệt http://localhost:15672 (user: guest / pass: guest)


<!-- chạy tổng -->
Docker Compose được đặt tại infra/docker/docker-compose.yml.
Các scripts ở infra/scripts/.

Chạy script setup full stack

bash scripts/setup-full-stack.sh

# Tắt toàn bộ stack
cd micro_ecomm/infra/docker
docker-compose down

# ✅ Tổng kết

Vị trí gọi: ecommerce-microservices/infra

Chạy full stack: bash scripts/setup-full-stack.sh

Kiểm tra: docker ps

Tạo route trên Kong: curl -X POST http://localhost:8001/...

Test API: curl http://localhost:8000/<route>


###### setup-kong-routes.sh
2️⃣ Cài đặt tiện ích

Cài jq để format JSON (nếu chưa có):

sudo apt install jq   # Ubuntu/Debian


Chmod script để có thể chạy:

chmod +x infra/scripts/setup-kong-routes.sh

3️⃣ Chạy script
cd ecommerce-microservices/infra
bash scripts/setup-kong-routes.sh


Script sẽ tự động tạo service + route cho tất cả microservice.

Kết quả trả về có dạng JSON, thông báo từng service và route đã tạo.

4️⃣ Test route

Sau khi script chạy xong:

# Auth
curl http://localhost:8000/auth/login

# Product
curl http://localhost:8000/product/list

# Cart
curl http://localhost:8000/cart

# Order
curl http://localhost:8000/order/list


Tất cả API đều đi qua Kong proxy (localhost:8000).

2 lệnh để full stack chạy:

bash infra/scripts/setup-full-stack.sh    # Chạy tất cả container và init DB
bash infra/scripts/setup-kong-routes.sh  # Tạo tất cả service + route trên Kong


