import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyArray, IsUUIDArray } from '@src/app/decorators';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Zahid',
  })
  @IsNotEmpty()
  @IsString()
  readonly accountName!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Hasan',
  })
  @IsNotEmpty()
  @IsString()
  readonly accontNumber!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'zahid@gmail.com',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly amount!: number;

}
