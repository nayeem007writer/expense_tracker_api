import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';

import { TRANSCATION } from '../entities/transcation.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TranscationService extends BaseService<TRANSCATION> {
  constructor(
    @InjectRepository(TRANSCATION)
    private readonly transcationRepository: Repository<TRANSCATION>,
  ) {
    super(transcationRepository);
  }

}
