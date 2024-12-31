import { IsNotEmpty, IsString, IsBase64, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePdfDto {
  @ApiProperty({
    description: 'Title of the PDF',
    example: 'example.pdf'
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    format: 'binary',
    required: false,
    example: 'image',
  })
  @IsOptional()
  readonly pdf!: string;
}
