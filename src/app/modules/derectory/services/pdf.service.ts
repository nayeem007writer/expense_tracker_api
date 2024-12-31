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
import { CreatePdfDto } from '../dtos/pdf/create.dto';
import { Pdf } from '../entities/pdf.entity';

@Injectable()
export class PdfService  extends BaseService<Pdf>{
constructor(
  @InjectRepository(Post)
  private readonly pdfRepository: Repository<Pdf>,
  private readonly userService: UserService,
){super(pdfRepository)}


 async savePdf({ title, pdf }: CreatePdfDto,files:any,authUser: IAuthUser): Promise<SuccessResponse> { 

  const user = await this.userService.findOne({where: {id:authUser.id}})
  const docPayload: any[] = [];

  if (files?.pdf) {
    const pdfObj = {
      title: 'Pdf',
      type: files.pdf[0].mimetype,
      url: path.resolve() + files.pdf[0].path,
    };
    docPayload.push(pdfObj);
  }

  const newPayload = {
    title: title,
    pdf: docPayload.find(doc => doc.title === 'Pdf')?.url || null,
    user: user,
  }
  const savedPdfObj = await this.pdfRepository.save(newPayload);
    return new SuccessResponse('Pdf created successfully', savedPdfObj);
}

}