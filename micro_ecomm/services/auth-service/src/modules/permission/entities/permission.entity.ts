/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RolePermission } from '../../role_permission/entities/role_permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  resource_type?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  uri?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  method?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  route_name?: string;

  // 👉 Quan hệ ngược lại với role_permissions
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  roles: RolePermission[];
  resource_permissions: any;
  user_permissions: any;
}
