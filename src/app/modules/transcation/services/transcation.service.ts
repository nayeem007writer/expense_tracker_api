import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';

import { TRANSCATION } from '../entities/transcation.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTranscationDTO } from '../dtos';
import { IAuthUser } from '@src/app/interfaces';
import { AccountService } from '../../account/services/account.service';
import { SuccessResponse } from '@src/app/types';

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
          return new SuccessResponse("transcation Successfully added!", data)
        }
      }
  }

}
