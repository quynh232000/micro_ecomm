import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'mydb',
  synchronize: process.env.DB_SYNC === 'true', // ⚠️ chỉ dùng dev
  logging: process.env.DB_LOG === 'true',
  autoLoadEntities: true,
}));
