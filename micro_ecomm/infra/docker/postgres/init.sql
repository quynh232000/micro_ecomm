-- Tạo DB chính cho microservice
CREATE DATABASE ecommerce;
CREATE USER root WITH PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO root;
-- DB cho Kong Gateway
CREATE DATABASE kong;
CREATE USER kong WITH PASSWORD 'kong';
GRANT ALL PRIVILEGES ON DATABASE kong TO kong;