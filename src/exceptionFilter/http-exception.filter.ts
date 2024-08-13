import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { writeFile } from "fs/promises";
import { join } from "path";
import { ResponseDto } from 'src/common/dtos/response.dto'; // Adjust the path as necessary

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = "Internal Server Error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }

    const { httpAdapter } = this.httpAdapterHost;

    const responseDto: ResponseDto = {
      message: msg,
      status: status,
      error: true, 
      data: null,
    };
const timestamp =new Date().toISOString();
    this.writeHttpLog(responseDto, );

    httpAdapter.reply(ctx.getResponse(), {responseDto, timestamp}, status);
  }

  private async writeHttpLog(data: Record<string, any>) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);

    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (err) {
      return;
    }
  }
}
