import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyArray, IsUUIDArray } from '@src/app/decorators';
import { TransactionStatus } from '@src/shared';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';


export class CreateTranscationDTO {
  @ApiProperty({ example: TransactionStatus.PENDING }) 
  @IsEnum(TransactionStatus) 
  @IsOptional() 
  status?: TransactionStatus; 

  @ApiProperty({ example: 'Monthly Subscription' }) 
  @IsString() 
  @IsOptional() 
  description?: string; 
  
  @ApiProperty({ example: 'Bank Transfer' }) 
  @IsString() 
  @IsOptional() 
  source?: string; 

  @ApiProperty({ example: 100.50 }) 
  @IsString() 
  @IsNotEmpty() 
  amount: string; 
  
  @ApiProperty({ example: 'income' }) 
  @IsString() 
  @IsOptional() 
  type?: string;
}
