import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import {  AddMoneyDTO, CreateJobDto, FilterBlogDTO, } from '../dtos';
import { PostService } from '../services/post.service';
import { AuthUser } from '@src/app/decorators';
import { IAuthUser } from '@src/app/interfaces';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
import { fixNullPrototype, ImageFilter, storageOptions } from '@src/app/util/extra.method';
import { ENV } from '@src/env';

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  RELATIONS = ['user'];
  constructor(private readonly service: PostService) {} 

  @Get()
  async findAll(@Query() query: FilterBlogDTO): Promise<SuccessResponse | any> {
    return this.service.findAllBase(query, {relations:this.RELATIONS});
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateJobDto })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "image", maxCount: 2 },
      ],
      {
        storage: storageOptions,
        fileFilter: ImageFilter,
        limits: { fileSize: ENV.IMAGE_MAX_SIZE },
      })
  )
  async createPost(    
  @UploadedFiles() files: any,
  @Body() data: CreateJobDto,
  @Req() request,
  @AuthUser() authUser: IAuthUser): Promise<SuccessResponse> {
    let _data: any = { ...data }
    console.log(_data);
    _data = await fixNullPrototype(_data);
    _data.uploadedFile = null;

    if (request.fileValidationError) {
      throw new BadRequestException(request.fileValidationError);
    }
    const album = request.files;
    return this.service.CreatePostByUser(_data, album, authUser);
  }
}
