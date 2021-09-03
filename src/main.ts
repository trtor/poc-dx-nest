import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import dotenv from dotenv;

// dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(5000);
}
bootstrap();
