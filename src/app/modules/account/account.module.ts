import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { Account } from './entities/account.entity';
import { AccountService } from './services/account.service';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

const entities = [Account];
const services = [AccountService,];
const subscribers = [];
const controllers = [AccountController];
const modules = [UserModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers],
})
export class AccountModule {}
