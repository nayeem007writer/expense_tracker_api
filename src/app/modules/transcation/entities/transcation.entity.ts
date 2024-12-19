import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES, TransactionStatus } from '@src/shared';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity(ENUM_TABLE_NAMES.TRANSCATION)
export class TRANSCATION extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [
    'status',
    'description',
    'source',
    'amount',
  ];

  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
  status?: TransactionStatus

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ unique: true, nullable: true })
  amount?: string;

  @Column({ unique: true, nullable: true,default:'income' })
  type?: string;

  @ManyToOne(() => User, user => user.transactions) 
  user?: User;

  constructor() {
    super();
  }
}



