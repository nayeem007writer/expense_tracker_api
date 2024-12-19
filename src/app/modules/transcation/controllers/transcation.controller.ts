import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import {  CreateTranscationDTO, FilterTranscationDTO, } from '../dtos';
import { TRANSCATION } from '../entities/transcation.entity';
import { TranscationService } from '../services/transcation.service';
import { IAuthUser } from '@src/app/interfaces';
import { AuthUser } from '@src/app/decorators';

@ApiTags('Transcation')
@ApiBearerAuth()
@Controller('transcation')
export class TranscationController {
  RELATIONS = ['user'];
  constructor(private readonly service: TranscationService) {}

  @Get()
  async findAll(
    @Query() query: FilterTranscationDTO
  ): Promise<SuccessResponse | TRANSCATION[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SuccessResponse| TRANSCATION> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

    @Post(':id')
    async createTranscation(
      @Body() body: CreateTranscationDTO,
      @AuthUser() authUser: IAuthUser,
      @Param('id') id: string
    ):Promise<SuccessResponse | TRANSCATION>{
      return this.service.createTranscation(body, authUser,id)
    }

}
