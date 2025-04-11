import { Module } from '@nestjs/common';
import { ImageProcessorController } from './image-processor.controller';
import { ImageProcessorService } from './image-processor.service';
import { SharpImageProcessor } from './vendors/sharp';

@Module({
  controllers: [ImageProcessorController],
  providers: [ImageProcessorService, SharpImageProcessor],
})
export class ImageProcessorModule {}
