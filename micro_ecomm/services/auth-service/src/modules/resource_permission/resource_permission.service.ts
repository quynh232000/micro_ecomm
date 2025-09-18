import { Injectable } from '@nestjs/common';
import { CreateResourcePermissionDto } from './dto/create-resource_permission.dto';
import { UpdateResourcePermissionDto } from './dto/update-resource_permission.dto';

@Injectable()
export class ResourcePermissionService {
  create(createResourcePermissionDto: CreateResourcePermissionDto) {
    return 'This action adds a new resourcePermission';
  }

  findAll() {
    return `This action returns all resourcePermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourcePermission`;
  }

  update(id: number, updateResourcePermissionDto: UpdateResourcePermissionDto) {
    return `This action updates a #${id} resourcePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourcePermission`;
  }
}
