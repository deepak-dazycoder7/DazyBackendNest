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
        const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;

        const responseDto: ResponseDto = {
            message,
            status,
            error: true,
            data: null,
        };

        response
            .status(status)
            .json(responseDto);
    }
}
