import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { isNotEmptyObject } from 'class-validator';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreateJobDto } from '../dtos';
import { IAuthUser } from '@src/app/interfaces';
import { UserService } from '../../user/services/user.service';
import { title } from 'process';
import * as FS from 'fs';
import * as path from 'path';
import { SuccessResponse } from '@src/app/types';

@Injectable()
export class PostService  extends BaseService<Post>{
constructor(
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>,
  private readonly userService: UserService,
){super(postRepository)}

async CreatePostByUser(payload: CreateJobDto, files: any, authUser: IAuthUser): Promise<SuccessResponse> {
  const user = await this.userService.findOne({where: {id:authUser.id}})
  console.log(user, '=====================', payload)
  if(!user.isActive) {
    throw new NotFoundException("user is not active !");
  }
  const docPayload: any[] = [];

  if (files?.image) {
    const jobImageObj = {
      title: 'Image',
      type: files.image[0].mimetype,
      url: path.resolve() + files.image[0].path,
    };
    docPayload.push(jobImageObj);
  }

  const newJobObj = {
    title: payload.title,
    description: payload.description,
    jobDate: payload.jobDate,
    user: user,
    creator: { id: authUser?.id },
    image: docPayload.find(doc => doc.title === 'Image')?.url || null,
  };

  const savedJobObj = await this.createOneBase(newJobObj);
  return new SuccessResponse('Post created successfully', savedJobObj);


}
}