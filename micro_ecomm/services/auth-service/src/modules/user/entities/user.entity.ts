// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  organization_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name?: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  birthday?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  password?: string;

  @Column({ type: 'boolean', default: false })
  is_blocked: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remember_token?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'int', default: 0 })
  failed_attempts: number;

  @Column({ type: 'timestamp', nullable: true })
  blocked_until?: Date;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at?: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
  resource_permissions: any;
  user_permissions: any;
  roles: any;
}
