import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe} from 'nestjs-i18n';
import { CustomValidationExceptionFilter } from './modules/common/all-validation/all.validation';
import { ResponseService } from './modules/common/utils/response.util';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new CustomValidationExceptionFilter(ResponseService));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true,  
  });

  await app.listen(3000);
}

bootstrap();
