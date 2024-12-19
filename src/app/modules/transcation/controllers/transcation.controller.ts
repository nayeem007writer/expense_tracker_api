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
import {  FilterUserDTO, } from '../dtos';
import { TRANSCATION } from '../entities/transcation.entity';
import { TranscationService } from '../services/transcation.service';

@ApiTags('Transcation')
@ApiBearerAuth()
@Controller('transcation')
export class TranscationController {
  RELATIONS = ['user'];
  constructor(private readonly service: TranscationService) {}

  @Get()
  async findAll(
    @Query() query: FilterUserDTO
  ): Promise<SuccessResponse | TRANSCATION[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

}
