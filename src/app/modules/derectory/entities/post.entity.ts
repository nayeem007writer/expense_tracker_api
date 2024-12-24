import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity(ENUM_TABLE_NAMES.POST)
export class Post extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [
    'title',
    'description',
    'user',
  ];

  @Column({unique: true, nullable: true })
  title?: string;

  @Column({ nullable: true ,type: ENUM_COLUMN_TYPES.VARCHAR})
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'date', nullable: true })
  jobDate?: Date;

  @ManyToOne((t) => User, (e) => e.post)
  user?: User;

  constructor() {
    super();
  }
}
