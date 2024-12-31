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

import { AuthUser } from '@src/app/decorators';
import { IAuthUser } from '@src/app/interfaces';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
import { fixNullPrototype, PdfFilter, storagePdfOptions } from '@src/app/util/extra.method';
import { ENV } from '@src/env';
import { CreatePdfDto } from '../dtos/pdf/create.dto';
import { PdfService } from '../services/pdf.service';

@ApiTags('Pdf')
@ApiBearerAuth()
@Controller('pdf')
export class PdfController {
  RELATIONS = ['user'];
  constructor(private readonly service: PdfService) {} 

   @Post('save') 
   @ApiConsumes("multipart/form-data")
   @ApiBody({ type: CreatePdfDto })
   @UseInterceptors(
    FileFieldsInterceptor(
        [{ name: "pdf", maxCount: 1 }],
        {
            storage: storagePdfOptions,
            fileFilter: PdfFilter,
            limits: { fileSize: ENV.IMAGE_MAX_SIZE },
          }
    )
   )
   async savePdf(
    @Body() createPdfDto: CreatePdfDto,
    @UploadedFiles() files: any,
    @Req() request,
    @AuthUser() authUser: IAuthUser
    ): Promise<SuccessResponse> { 
    const { title, pdf } = createPdfDto; 
        let _data: any = { ...createPdfDto }
        console.log(_data);
        _data = await fixNullPrototype(_data);
        _data.uploadedFile = null;
    
        if (request.fileValidationError) {
          throw new BadRequestException(request.fileValidationError);
        }
    const album = request.files;    
     return await this.service.savePdf(_data,album,authUser);
}
}
