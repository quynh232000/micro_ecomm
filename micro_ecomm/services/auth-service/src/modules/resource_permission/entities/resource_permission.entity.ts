/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('resource_permissions')
export class ResourcePermission {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  resource_type: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  resource_id?: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  user_id?: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  permission_id?: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // 👉 Quan hệ
  @ManyToOne(() => User, (user) => user.resource_permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Permission, (permission) => permission.resource_permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission?: Permission;
}
