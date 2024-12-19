import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { isNotEmptyObject } from 'class-validator';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountDTO } from '../dtos/account/create.dto';
import { IAuthUser } from '@src/app/interfaces';
import { UserService } from '../../user/services/user.service';
import { SuccessResponse } from '@src/app/types';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly userService : UserService
  ) {
    super(accountRepository);
  }

  async createAccount(body: CreateAccountDTO,authUser: IAuthUser): Promise<SuccessResponse> {
    const newAccount = this.accountRepository.create(body);
    const user = await this.userService.findByIdBase(authUser.id)
    newAccount.user= user
    return new SuccessResponse('account created successfully', newAccount)
  }


}
