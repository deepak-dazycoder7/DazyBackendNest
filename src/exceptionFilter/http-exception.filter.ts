import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, BadRequestException } from '@nestjs/common';
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
      // Directly use the object with validation errors and messages
      errorResponse = exception.getResponse();
      responseMessage = 'Validation failed';
    }

    // Generate the response using returnResponse function
    const responseDto = this.returnResponseFunction(
      responseMessage,
      status,
      errorResponse
    );

    response
      .status(status)
      .json(responseDto);
  }
}
