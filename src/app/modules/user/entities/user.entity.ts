import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Type } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../../acl/entities/role.entity';
import { UserRole } from './userRole.entity';
import { Account } from '../../account/entities/account.entity';
import { TRANSCATION } from '../../transcation/entities/transcation.entity';

@Entity(ENUM_TABLE_NAMES.USERS)
export class User extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [
    'email',
    'username',
    'phoneNumber',
    'firstName',
    'lastName',
    'fullName',
  ];

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ select: false, nullable: true })
  password?: string;

  @Column({ select: false, nullable: true, type: 'simple-array' })
  accounts?: string[];

  @Column({ select: false, nullable: true, })
  country?: string;

  @Column({ select: false, nullable: true, })
  currency?: string;
  

  @Column({ select: false, nullable: true, type: ENUM_COLUMN_TYPES.TEXT })
  accessToken?: string;

  @Column({ select: false, nullable: true, type: ENUM_COLUMN_TYPES.TEXT })
  permissionToken?: string;

  @Column({ select: false, nullable: true, type: ENUM_COLUMN_TYPES.TEXT })
  refreshToken?: string;

  @OneToMany((t) => UserRole, (e) => e.user)
  @Type((t) => UserRole)
  userRoles?: UserRole[];

  @OneToMany((t) => Account, (e) => e.user)
  accountTable?: Account;

  @OneToMany(() => TRANSCATION, transaction => transaction.user)
  transactions?: TRANSCATION[];

  roles?: Role[] = [];

  constructor() {
    super();
  }
}
