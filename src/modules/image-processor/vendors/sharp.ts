/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import {
  AcceptedImageFormats,
  ProcessImageOptions,
} from '../image-type.config';

Injectable();
export class SharpImageProcessor {
  async processImage(image: Express.Multer.File, options: ProcessImageOptions) {
    return sharp(image.buffer)
      .resize({ width: options.width, height: options.height, fit: 'fill' })
      .toFormat(options.imageType)
      .toBuffer();
  }

  async cropImage(
    image: Express.Multer.File,
    cropOpt: { x: number; y: number; width: number; height: number },
    outputFormat?: AcceptedImageFormats,
  ) {
    const sharpImageInstance = sharp(image.buffer);
    const imageMetadata = await sharpImageInstance.metadata();

    const widthExceeded = cropOpt.x + cropOpt.width > imageMetadata.width;
    const heightExceeded = cropOpt.y + cropOpt.height > imageMetadata.height;
    if (widthExceeded || heightExceeded) {
      throw new BadRequestException(
        `Crop dimensions exceeds the image dimensions.`,
      );
    }

    return sharpImageInstance
      .extract({
        left: cropOpt.x, // Offset from the left edge
        top: cropOpt.y, // Offset from the top edge
        width: cropOpt.width, // Width of the cropped region
        height: cropOpt.height, // Height of the cropped region
      })
      .toFormat(outputFormat || AcceptedImageFormats.webp)
      .toBuffer();
  }
}
