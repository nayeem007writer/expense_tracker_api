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
import { AddMoneyDTO } from '../dtos';

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
    const user = await this.userService.findByIdBase(authUser.id)
    const account = {
      user:user,
      accountName:body.accountName,
      accontNumber: body.accontNumber,
      amount : body.amount
    }
    console.log(account)
    const v =await this.accountRepository.save(account);
    console.log(v);
    return new SuccessResponse('account created successfully', v)
  }

  async addMoney(body: AddMoneyDTO, id: any): Promise<SuccessResponse> {
    const findAccount = await this.findByIdBase(id);

    if(!findAccount) {
      throw new BadRequestException('Account not found!')
    }
    
    let newAmount = parseFloat(findAccount.amount) + parseFloat(body.amount)
    findAccount.amount = newAmount.toString();

    const updateAccount = await this.updateOneBase(id, findAccount)

    return new SuccessResponse("Amount Updated Successfully!", updateAccount)

  }

}
