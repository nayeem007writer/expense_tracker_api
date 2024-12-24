import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyArray, IsUUIDArray } from '@src/app/decorators';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import * as multer from 'multer';



export class CreateJobDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Zahid',
  })
  @IsNotEmpty()
  @IsString()
  readonly description!: string;

  @ApiProperty({
    format: 'binary',
    required: false,
    example: 'image',
  })
  @IsOptional()
  readonly image!: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '2024-05-19',
  })
  @IsOptional()
  @IsDateString()
  readonly jobDate!: Date;
}
