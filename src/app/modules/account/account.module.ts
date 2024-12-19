import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { Account } from './entities/account.entity';
import { AccountService } from './services/account.service';

const entities = [Account];
const services = [AccountService,];
const subscribers = [];
const controllers = [AccountController];
const modules = [];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers],
})
export class AccountModule {}
