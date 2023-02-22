import { AppError } from '@app/errors/app-error';
import { getReasonPhrase } from 'http-status-codes';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const message = exception.message;
    const code = exception.code;
    const description = exception.description;

    response.status(code).json({
      message,
      code,
      error: getReasonPhrase(code),
      ...(description && { description }),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
