import { Test, TestingModule } from '@nestjs/testing';
import { ResourcePermissionController } from './resource_permission.controller';
import { ResourcePermissionService } from './resource_permission.service';

describe('ResourcePermissionController', () => {
  let controller: ResourcePermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcePermissionController],
      providers: [ResourcePermissionService],
    }).compile();

    controller = module.get<ResourcePermissionController>(ResourcePermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
