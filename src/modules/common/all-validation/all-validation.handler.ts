import { ValidationPipe, ValidationError, BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(private readonly i18n: I18nService) {
    super({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = this.formatErrors(validationErrors);
        return new BadRequestException({
          statusCode: 400,
          message: this.i18n.translate('validation.failed'),
          error: true,
          data: { formattedErrors: errors },
        });
      },
    });
  }

  protected formatErrors(validationErrors: ValidationError[]): Record<string, string> {
    const formattedErrors = {};

    validationErrors.forEach((error) => {
      if (error.children && error.children.length > 0) {
        Object.assign(formattedErrors, this.formatErrors(error.children));
      } else {
        Object.assign(formattedErrors, this.translateConstraints(error.constraints));
      }
    });

    return formattedErrors;
  }

  private translateConstraints(constraints: Record<string, string>): Record<string, string> {
    const translatedConstraints = {};

    for (const [constraintKey, constraintMessage] of Object.entries(constraints)) {
      const [messageKey] = constraintMessage.split('|');
      translatedConstraints[constraintKey] = this.i18n.translate(messageKey.trim());
    }

    return translatedConstraints;
  }
}
