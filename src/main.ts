import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { ValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = parseInt(configService.get<string>('PORT'), 10) || 3000;
  const corsOption = {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  };

  app.use(cors(corsOption));
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => {
    Logger.log(`Server running... Listening on port: ${PORT}`);
  });
}

bootstrap();
