# Tạo NestJS project
npm i -g @nestjs/cli
nest new auth-service

# Cài thêm thư viện JWT
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt

# sử dụng nestjs gen
# Tạo module
nest g module user

# Tạo controller
nest g controller user

# Tạo service
nest g service user
nest g resource user


# npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
npm install --save-dev @types/node

npm run migration:run
npm run migration:revert
npm run typeorm -- migration:generate src/infrastructure/database/migrations/init

npm install @nestjs/swagger swagger-ui-express
npm install -D @types/swagger-ui-express
