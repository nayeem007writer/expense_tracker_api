import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity(ENUM_TABLE_NAMES.ACCOUNT)
export class Account extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [
    'accountName',
    'accontNumber',
  ];

  @Column({unique: true, nullable: true })
  accountName?: string;

  @Column({ unique: true, nullable: true })
  accontNumber?: string;

  @Column({ nullable: true })
  amount?: string;

  @ManyToOne((t) => User, (e) => e.accountTable)
  user?: User;

  constructor() {
    super();
  }
}
