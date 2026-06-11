import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request } from 'express'

import { LoggerProvider } from '@core/providers'

const DEFAULT_ERROR = 'Ocorreu um erro ao tratar a solicitação.'

const getBodyFromException = (exception: HttpException) => {
  const response: any = exception.getResponse()

  const { message: responseMessage } =
    typeof response === 'string' ? { message: response } : response

  return {
    statusCode: exception.getStatus(),
    error: exception.message,
    messages: [responseMessage || exception.message].flat(),
  }
}

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerProvider,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest<Request>()

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus()
      const responseBody = getBodyFromException(exception)

      this.logAPIError(request, responseBody)
      httpAdapter.reply(response, responseBody, httpStatus)
    } else {
      this.logger.logInternalError({
        name: exception?.name,
        message: exception?.message,
        stack: exception?.stack,
        cause: exception?.cause,
      })

      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      const responseBody = {
        statusCode: httpStatus,
        error: DEFAULT_ERROR,
        messages: [DEFAULT_ERROR],
      }

      this.logAPIError(request, responseBody)
      httpAdapter.reply(response, responseBody, httpStatus)
    }
  }

  private logAPIError(request, responseBody) {
    this.logger.logAPIError({
      clientIP: request.ip || request.ips || request?.socket?.remoteAddress,
      method: request.method,
      url: request.originalUrl,
      requestBody: request.body,
      requestParams: request.query,
      requestHeaders: request.headers,
      errorMessage: responseBody,
    })
  }
}

export const configureExceptionFilter = (app: INestApplication) => {
  const httpAdapter = app.get(HttpAdapterHost)
  const logger = app.get(LoggerProvider)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger))
}
