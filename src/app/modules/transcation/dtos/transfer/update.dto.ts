import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '@src/shared/db.constants';
import {

  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,

} from 'class-validator';


export class TransferrTranscationDTO {
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
  
  @ApiProperty({ example: 'tg4r5t543535554' })
  @IsNotEmpty()
  @IsString()
  idFrom: string;

  @ApiProperty({ example: '4635stgrrrrreyergtr54' })
  @IsNotEmpty()
  @IsString()
  idTo: string;

  @ApiProperty({ example: 100.50 }) 
  @IsString() 
  @IsNotEmpty() 
  amount?: string; 
  
  @ApiProperty({ example: 'income' }) 
  @IsString() 
  @IsOptional() 
  type?: string;
}
