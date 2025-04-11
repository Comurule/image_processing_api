import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AcceptedImageFormats } from '../image-type.config';
import { Type } from 'class-transformer';

export class CropImageDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  x: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  y: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  width: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  height: number;

  @IsEnum(AcceptedImageFormats)
  @IsString()
  @IsOptional()
  outputFormat?: AcceptedImageFormats = AcceptedImageFormats.webp;
}
