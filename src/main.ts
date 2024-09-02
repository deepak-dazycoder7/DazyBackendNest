import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from './modules/common/all-validation/all-validation.handler';
import { I18nService } from 'nestjs-i18n';
import { TranslationRecords } from './modules/common/multi-language/i18n/translator.type';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
    //   new ValidationPipe({
      //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     exceptionFactory: (errors) => {
    //       const formattedErrors = errors.reduce((acc, err) => {
      //         acc[err.property] = Object.values(err.constraints).join(', ');
      //         return acc;
      //       }, {});
      //       return new BadRequestException(formattedErrors);
      //     },
      //   }),
      
      // );
      app.useGlobalFilters(new I18nValidationExceptionFilter());
      const i18nService = app.get(I18nService<TranslationRecords>);
    app.useGlobalPipes(new I18nValidationPipe(i18nService));  
  await app.listen(3000);
}
bootstrap();
