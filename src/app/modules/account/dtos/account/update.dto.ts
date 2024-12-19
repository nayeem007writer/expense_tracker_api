import { ApiProperty } from '@nestjs/swagger';
import { IsUUIDArray } from '@src/app/decorators';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';


export class AddMoneyDTO {

  @ApiProperty({
    type: String,
    required: true,
    example: 12233,
  })
  @IsOptional()
  @IsString()
  readonly amount!: string;

}
