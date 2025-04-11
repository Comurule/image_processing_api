import { Injectable, Logger } from '@nestjs/common';
import { SharpImageProcessor } from './vendors/sharp';
import { ProcessImageDTO } from './dto/process-image.dto';
import { imageTypeConfig } from './image-type.config';
import { CropImageDTO } from './dto/crop-image.dto';

@Injectable()
export class ImageProcessorService {
  private logger = new Logger(ImageProcessorService.name);

  constructor(private sharpImageProcessor: SharpImageProcessor) {}

  async processImage(file: Express.Multer.File, dto: ProcessImageDTO) {
    const imageSize = imageTypeConfig[dto.imageType];
    const filename = imageSize.getFilename(file.originalname);
    const imageBuffer = await this.sharpImageProcessor.processImage(
      file,
      imageSize,
    );

    return {
      filename,
      buffer: imageBuffer,
      mimeType: imageSize.imageType,
    };
  }

  async cropImage(file: Express.Multer.File, dto: CropImageDTO) {
    const imageBuffer = await this.sharpImageProcessor.cropImage(file, dto);

    return {
      filename: file.originalname,
      buffer: imageBuffer,
    };
  }
}
