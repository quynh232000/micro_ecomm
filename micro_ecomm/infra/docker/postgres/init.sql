-- DB chính cho microservice
CREATE DATABASE ecommerce;
CREATE USER root WITH PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO root;
-- DB cho Kong Gateway
CREATE DATABASE kong;
CREATE USER kong WITH PASSWORD 'kong';
GRANT ALL PRIVILEGES ON DATABASE kong TO kong;
-- Auth Service
CREATE DATABASE auth_service_db;
CREATE USER auth_service_user WITH PASSWORD 'auth_pass';
GRANT ALL PRIVILEGES ON DATABASE auth_service_db TO auth_service_user;
-- Product Service
CREATE DATABASE product_service_db;
CREATE USER product_service_user WITH PASSWORD 'product_pass';
GRANT ALL PRIVILEGES ON DATABASE product_service_db TO product_service_user;
-- Cart Service
CREATE DATABASE cart_service_db;
CREATE USER cart_service_user WITH PASSWORD 'cart_pass';
GRANT ALL PRIVILEGES ON DATABASE cart_service_db TO cart_service_user;
-- Order Service
CREATE DATABASE order_service_db;
CREATE USER order_service_user WITH PASSWORD 'order_pass';
GRANT ALL PRIVILEGES ON DATABASE order_service_db TO order_service_user;
-- Payment Service
CREATE DATABASE payment_service_db;
CREATE USER payment_service_user WITH PASSWORD 'payment_pass';
GRANT ALL PRIVILEGES ON DATABASE payment_service_db TO payment_service_user;
-- Shipping Service
CREATE DATABASE shipping_service_db;
CREATE USER shipping_service_user WITH PASSWORD 'shipping_pass';
GRANT ALL PRIVILEGES ON DATABASE shipping_service_db TO shipping_service_user;
-- Notification Service
CREATE DATABASE notification_service_db;
CREATE USER notification_service_user WITH PASSWORD 'notification_pass';
GRANT ALL PRIVILEGES ON DATABASE notification_service_db TO notification_service_user;
-- Review Service
CREATE DATABASE review_service_db;
CREATE USER review_service_user WITH PASSWORD 'review_pass';
GRANT ALL PRIVILEGES ON DATABASE review_service_db TO review_service_user;
-- Search Service
CREATE DATABASE search_service_db;
CREATE USER search_service_user WITH PASSWORD 'search_pass';
GRANT ALL PRIVILEGES ON DATABASE search_service_db TO search_service_user;