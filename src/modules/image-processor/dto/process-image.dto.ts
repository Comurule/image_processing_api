import { IsEnum, IsString } from 'class-validator';
import { ImageTypeEnum } from '../image-type.config';

export class ProcessImageDTO {
  @IsEnum(ImageTypeEnum)
  @IsString()
  imageType: ImageTypeEnum;
}
