import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';

import { TRANSCATION } from '../entities/transcation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTranscationDTO, } from '../dtos';
import { IAuthUser } from '@src/app/interfaces';
import { AccountService } from '../../account/services/account.service';
import { SuccessResponse } from '@src/app/types';
import { TransferrTranscationDTO } from '../dtos/transfer/update.dto';

@Injectable()
export class TranscationService extends BaseService<TRANSCATION> {
  constructor(
    @InjectRepository(TRANSCATION)
    private readonly transcationRepository: Repository<TRANSCATION>,
    private readonly accountService: AccountService
  ) {
    super(transcationRepository);
  }

  async createTranscation(body: CreateTranscationDTO, authUser: IAuthUser, id: any): Promise<SuccessResponse | TRANSCATION> {
      if(parseFloat(body.amount) > 0) {
        const findAccount = await this.accountService.findByIdBase(id);

        if(!findAccount)
          throw new BadRequestException('Account not found!')
        if(parseFloat(findAccount.amount) > parseFloat(body.amount) && parseFloat(findAccount.amount) > 0) {
          let amount = parseFloat(findAccount.amount) - parseFloat(body.amount);
          let transactionPayload = {
            amount: amount.toString(),
            description: body.description,
            source: body.source,
            status: body.status,
            type: body.type,
            user: findAccount.user
          }
          const data = await this.transcationRepository.save(transactionPayload)
          await this.accountService.updateOneBase(id, findAccount);
          return new SuccessResponse("transcation Successfully added!", data)
        }

        throw new BadRequestException('Invalid Credentials')
      }
  }

  async transferMoneyToAnotherAccount(body: TransferrTranscationDTO, authUser: IAuthUser): Promise<SuccessResponse | TRANSCATION> {
    const {idTo,idFrom,description,source,status, amount, type} = body;
    const findIdForm = await this.accountService.findByIdBase(body.idFrom);
    const findIdTo = await this.accountService.findByIdBase(body.idTo);

    if(!findIdForm && !findIdTo) {
      throw new BadRequestException('Invalid Credentials')
    }

    if (Number(findIdForm.amount) > 0 && Number(findIdForm.amount) > Number(amount)) {
      findIdForm.amount = (Number(findIdForm.amount) - Number(amount)).toString();
      findIdTo.amount = (Number(findIdTo.amount) + Number(amount)).toString();
      await this.accountService.updateOneBase(findIdForm.id, findIdForm);
      await this.accountService.updateOneBase(findIdTo.id, findIdTo);

      const user = findIdForm.user;
      const transcationPayload = {
        description,
        source,
        status, 
        amount, 
        type,
        user,
        idFrom,
        idTo
      }
      const transcation = await this.transcationRepository.save(transcationPayload);

      return new SuccessResponse('transcation Succefulll!', transcation);
    }
    throw new BadRequestException('Invalid Credentials')
  }

}
