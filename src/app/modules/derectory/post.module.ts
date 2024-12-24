import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

const entities = [Post];
const services = [PostService,];
const subscribers = [];
const controllers = [PostController];
const modules = [UserModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers],
})
export class PostModule {}
