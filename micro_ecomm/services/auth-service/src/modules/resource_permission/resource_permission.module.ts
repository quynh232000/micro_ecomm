import { Module } from '@nestjs/common';
import { ResourcePermissionService } from './resource_permission.service';
import { ResourcePermissionController } from './resource_permission.controller';

@Module({
  controllers: [ResourcePermissionController],
  providers: [ResourcePermissionService],
})
export class ResourcePermissionModule {}
