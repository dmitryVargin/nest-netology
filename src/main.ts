import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppTransformInterceptor } from './app.transform.interceptor';
import { HttpExceptionFilter } from './http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.useGlobalInterceptors(new AppTransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
