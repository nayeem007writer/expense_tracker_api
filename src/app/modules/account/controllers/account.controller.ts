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
import {  AddMoneyDTO, CreateAccountDTO, FilterAccountDTO, } from '../dtos';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { AuthUser } from '@src/app/decorators';
import { IAuthUser } from '@src/app/interfaces';

@ApiTags('Account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  RELATIONS = ['user',];
  constructor(private readonly service: AccountService) {}

  @Get()
  async findAll(
    @Query() query: FilterAccountDTO
  ): Promise<SuccessResponse | Account[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Account> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async create(
    @Body() body: CreateAccountDTO,
    @AuthUser() authUser: IAuthUser
  ):Promise<SuccessResponse>{
    return this.service.createAccount(body, authUser)
  }

  @Patch('add/money:id')
  async addMoney(
    @Param('id') id: string,
    @Body() body: AddMoneyDTO
  ):Promise<SuccessResponse> {
    return this.service.addMoney(body, id)
  }
}
