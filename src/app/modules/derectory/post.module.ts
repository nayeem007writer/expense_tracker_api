import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';
import { Pdf } from './entities/pdf.entity';
import { PdfService } from './services/pdf.service';
import { PdfController } from './controllers/pdf.controller';

const entities = [Post,Pdf];
const services = [PostService,PdfService];
const subscribers = [];
const controllers = [PostController, PdfController];
const modules = [UserModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers],
})
export class PostModule {}
