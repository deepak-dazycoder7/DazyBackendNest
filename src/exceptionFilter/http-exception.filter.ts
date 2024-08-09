import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../common/dtos/response.dto'; 

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const errorMessage = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;

        const responseDto: ResponseDto<null> = {
            message: 'An error occurred',
            status,
            error: true,
            data: null,
            errorMessage,
        };

        response
            .status(status)
            .json(responseDto);
    }
}
