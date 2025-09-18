import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import { UserRoleModule } from './modules/user_role/user_role.module';
import { RolePermissionModule } from './modules/role_permission/role_permission.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ResourcePermissionModule } from './modules/resource_permission/resource_permission.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { UserPermissionModule } from './modules/user_permission/user_permission.module';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    UserModule,
    RoleModule,
    ConfigModule.forRoot({
      isGlobal: true, // để mọi module đều dùng được process.env
      load: [databaseConfig],
    }),
    UserRoleModule,
    RolePermissionModule,
    PermissionModule,
    ResourcePermissionModule,
    UserPermissionModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
