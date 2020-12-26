import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduls/app/app.module';
import * as cookieParser from 'cookie-parser';
import { AppLogger } from './moduls/logger/logger';
import * as session from 'express-session';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };

  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  app.use(
    session({
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new AppLogger());

  await app.listen(3333);
}

bootstrap();
