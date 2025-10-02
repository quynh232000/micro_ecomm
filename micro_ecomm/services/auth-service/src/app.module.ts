import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRoleModule } from './modules/user_role/user_role.module';
import { RolePermissionModule } from './modules/role_permission/role_permission.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ResourcePermissionModule } from './modules/resource_permission/resource_permission.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { UserPermissionModule } from './modules/user_permission/user_permission.module';
import databaseConfig from './config/database.config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { InternalModule } from './modules/internal/internal.module';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import redisConfig from './config/redis.config';
import { CacheModule } from './infrastructure/cache/cache.module';

// mail
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để mọi module đều dùng được process.env
      load: [databaseConfig, redisConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database'); // 👈 lấy ra object từ registerAs
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          ...db,
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // fallback nếu không autoLoadEntities
        };
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    RolePermissionModule,
    PermissionModule,
    ResourcePermissionModule,
    UserPermissionModule,
    OrganizationModule,
    RouterModule.register([
      // {
      //   path: 'api/v1', // prefix cho AuthModule
      //   module: UserModule,
      // },
    ]),
    InternalModule,
    // i18n
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    CacheModule,
    // mail
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '', 10),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: path.join(__dirname, '..', 'templates/mail'),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
