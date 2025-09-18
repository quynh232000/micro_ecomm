import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourcePermissionService } from './resource_permission.service';
import { CreateResourcePermissionDto } from './dto/create-resource_permission.dto';
import { UpdateResourcePermissionDto } from './dto/update-resource_permission.dto';

@Controller('resource-permission')
export class ResourcePermissionController {
  constructor(private readonly resourcePermissionService: ResourcePermissionService) {}

  @Post()
  create(@Body() createResourcePermissionDto: CreateResourcePermissionDto) {
    return this.resourcePermissionService.create(createResourcePermissionDto);
  }

  @Get()
  findAll() {
    return this.resourcePermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcePermissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourcePermissionDto: UpdateResourcePermissionDto) {
    return this.resourcePermissionService.update(+id, updateResourcePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcePermissionService.remove(+id);
  }
}
