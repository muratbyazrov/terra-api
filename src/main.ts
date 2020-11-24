import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduls/app/app.module';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
