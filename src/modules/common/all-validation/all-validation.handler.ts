import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TranslationRecords } from '../multi-language/i18n/translator.type';

@Injectable()
export class I18nValidationPipe extends ValidationPipe {
    constructor(private readonly i18n: I18nService<TranslationRecords>) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce((acc, err) => {
          const constraints = Object.keys(err.constraints).map((key) =>
            this.i18n.translate(`validation.${key}`, {
              args: { property: err.property },
            })
          );
          acc[err.property] = constraints.join(', ');
          return acc;
          
        }, {});
        return new BadRequestException(formattedErrors);
      },
    });
  }
}
