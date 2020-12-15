import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduls/app/app.module';
import * as cookieParser from 'cookie-parser';
import { AppLogger, logger } from './moduls/logger/logger';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };

  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new AppLogger());

  await app.listen(3333);
}

bootstrap();
