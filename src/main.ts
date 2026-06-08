import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation pipes so DTO restrictions work smoothly
  app.useGlobalPipes(new ValidationPipe());
  
  // Open CORS so Next.js apps running on port 3001 or 3000 can reach it
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Backend running on: http://localhost:3000');
}
bootstrap();