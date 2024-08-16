import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(
    @Inject('CREATE_RESPONSE') private readonly returnResponseFunction
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let responseMessage: string | any = exception.message;
    let errorResponse = null;

    if (exception instanceof BadRequestException) {
      // Extract the validation error details
      errorResponse = exception.getResponse();
      responseMessage = 'Validation failed';
    } else if (exception instanceof ForbiddenException) {
      responseMessage = 'Access denied: ' + exception.message;
    }

    // Generate the response using returnResponse function
    const returnResponse = this.returnResponseFunction(
      responseMessage,
      status,
      errorResponse
    );

    response
      .status(status)
      .json(returnResponse);
      
  }
}
