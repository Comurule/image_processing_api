import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageProcessorModule } from './modules/image-processor/image-processor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ImageProcessorModule,
  ],
})
export class AppModule {}
