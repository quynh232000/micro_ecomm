import { PartialType } from '@nestjs/mapped-types';
import { CreateResourcePermissionDto } from './create-resource_permission.dto';

export class UpdateResourcePermissionDto extends PartialType(CreateResourcePermissionDto) {}
