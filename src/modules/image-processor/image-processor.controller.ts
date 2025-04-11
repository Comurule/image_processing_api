import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageProcessorService } from './image-processor.service';
import { ProcessImageDTO } from './dto/process-image.dto';
import { Response } from 'express';
import { CropImageDTO } from './dto/crop-image.dto';
import { AcceptedImageFormats } from './image-type.config';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

@Controller({
  path: 'images',
})
export class ImageProcessorController {
  constructor(private readonly imageProcessorService: ImageProcessorService) {}

  @HttpCode(200)
  @Post('preview')
  @UseInterceptors(FileInterceptor('image'))
  async processImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ProcessImageDTO,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const filetype = file.mimetype.replace(
      'image/',
      '',
    ) as AcceptedImageFormats;
    if (!Object.values(AcceptedImageFormats).includes(filetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Only image files are allowed.`,
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max allowed is 5MB.`,
      );
    }
    const processedImage = await this.imageProcessorService.processImage(
      file,
      dto,
    );

    res.set({
      'Content-Type': `image/${processedImage.mimeType}`,
      'Content-Length': processedImage.buffer.length,
      'Content-Disposition': `inline; filename="${processedImage.filename}"`,
    });

    return res.send(processedImage.buffer);
  }

  @HttpCode(200)
  @Post('crop')
  @UseInterceptors(FileInterceptor('image'))
  async cropImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CropImageDTO,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const filetype = file.mimetype.replace(
      'image/',
      '',
    ) as AcceptedImageFormats;
    if (!Object.values(AcceptedImageFormats).includes(filetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Only image files are allowed.`,
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max allowed is 5MB.`,
      );
    }

    const processedImage = await this.imageProcessorService.cropImage(
      file,
      dto,
    );

    res.set({
      'Content-Type': `image/${dto.outputFormat}`,
      'Content-Length': processedImage.buffer.length,
      'Content-Disposition': `inline; filename="${processedImage.filename}"`,
    });

    return res.send(processedImage.buffer);
  }
}
