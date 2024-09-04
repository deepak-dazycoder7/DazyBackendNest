import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe} from 'nestjs-i18n';
import { CustomValidationExceptionFilter } from './modules/common/all-validation/all.validation';
import { ResponseService } from './modules/common/utils/response.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe());

  app.useGlobalFilters(new CustomValidationExceptionFilter(ResponseService))

  await app.listen(3000);
}

bootstrap();
