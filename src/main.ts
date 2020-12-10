import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduls/app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions)
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
