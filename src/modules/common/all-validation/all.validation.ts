import { ValidationError } from 'class-validator';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { Inject } from '@nestjs/common';

export class CustomValidationExceptionFilter extends I18nValidationExceptionFilter {
    constructor(
        @Inject('CREATE_RESPONSE') private readonly  ResponseService 
    ) {
        super({
            errorFormatter: (errors: ValidationError[]) => {
                const formattedErrors = errors.map(error => {
                    if (error.constraints) {
                        return Object.keys(error.constraints).map(constraintKey => ({
                            field: error.property,
                            message: error.constraints[constraintKey]
                        }));
                    }
                }).flat();

                return this.ResponseService( 
                    formattedErrors,
                );
            }
        });
    }
}
