micro_ecommerce/
│── api-gateway/              # API Gateway (NestJS, Kong, Traefik, Nginx)
│
├── services/                 # Các microservice chính
│   ├── auth-service/         # Quản lý user, login, JWT, OAuth
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── ...
│   │
│   ├── product-service/      # Sản phẩm, danh mục, tồn kho
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── ...
│   │
│   ├── cart-service/         # Giỏ hàng (Redis cache)
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   ├── order-service/        # Đơn hàng (transactional)
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   ├── payment-service/      # Thanh toán (VNPay, Momo, Stripe)
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   ├── shipping-service/     # Vận chuyển (tích hợp GHTK, GHN)
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   ├── notification-service/ # Email, SMS, Push Notification
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   ├── review-service/       # Đánh giá, rating
│   │   ├── src/
│   │   └── Dockerfile
│   │
│   └── search-service/       # Elasticsearch
│       ├── src/
│       └── Dockerfile
│
├── infra/                    # Hạ tầng
│   ├── docker-compose.yml    # Local dev
│   ├── k8s/                  # Kubernetes manifest (deployment, service, ingress)
│   ├── message-broker/       # Kafka / RabbitMQ config
│   ├── redis/
│   ├── elasticsearch/
│   └── postgres/
│
├── frontend/                 # Frontend (React/Next.js, Vue hoặc Flutter)
│   ├── web/
│   └── mobile/
│
├── shared/                   # Thư viện dùng chung
│   ├── proto/                # gRPC proto file
│   ├── dto/                  # DTO model
│   └── utils/                # Thư viện common
│
└── docs/                     # Tài liệu kiến trúc, API spec (OpenAPI/Swagger)