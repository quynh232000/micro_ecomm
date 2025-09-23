import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiOperation({ summary: 'tạo role' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'danh sách role' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'chi tiết role' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'cập nhật role' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'xóa role' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
  @Get('user_role')
  @ApiOperation({ summary: 'danh sách role của user' })
  setUserRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @Post('user_role')
  @ApiOperation({ summary: 'Tạo role cho user', description: 'API này cho phép gán role cho user dựa trên thông tin truyền vào' })
  getUserRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
}
