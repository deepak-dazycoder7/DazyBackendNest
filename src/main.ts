import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import { HttpStatus, BadRequestException } from '@nestjs/common';

// Custom error formatter function
const customErrorFormatter = (errors: ValidationError[]) => {
  const formattedErrors = errors.map(err => ({
    // Only include constraints from the validation error
    constraints: err.constraints
  }));

  return { errors: formattedErrors };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Use global validation pipe
app.useGlobalPipes(new I18nValidationPipe());

  // Use global exception filter with custom settings
  app.useGlobalFilters(new I18nValidationExceptionFilter({
   // detailedErrors: false, // Simplify error messages
    errorFormatter: customErrorFormatter, // Use the custom error formatter
    errorHttpStatusCode: HttpStatus.BAD_REQUEST, // Set HTTP status code
  }));

  app.useGlobalPipes(new I18nValidationPipe());
  await app.listen(3000);
}
bootstrap();
