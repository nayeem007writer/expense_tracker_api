import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity(ENUM_TABLE_NAMES.PDF)
export class Pdf extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [
    'title',
    'data',
  ];

  @Column({unique: true, nullable: true })
  title?: string;

  @Column('bytea')
   pdf?: Buffer;

  @ManyToOne((t) => User, (e) => e.post)
  user?: User;

  constructor() {
    super();
  }
}
