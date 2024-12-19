
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscationController } from './controllers/transcation.controller';
import { TRANSCATION } from './entities/transcation.entity';
import { TranscationService } from './services/transcation.service';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';


const entities = [TRANSCATION,];
const services = [TranscationService,];
const subscribers = [];
const controllers = [TranscationController];
const webControllers = [];
const modules = [AccountModule, UserModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers],
})
export class TranscationModule {}
