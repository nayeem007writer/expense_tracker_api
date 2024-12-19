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
import {  FilterAccountDTO, } from '../dtos';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';

@ApiTags('Account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  RELATIONS = ['userRoles', 'userRoles.role'];
  constructor(private readonly service: AccountService) {}

  @Get()
  async findAll(
    @Query() query: FilterAccountDTO
  ): Promise<SuccessResponse | Account[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }
}
