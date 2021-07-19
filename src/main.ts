import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: ['https://streamlabs.com'] });
  await app.listen(3000);
}
bootstrap();
