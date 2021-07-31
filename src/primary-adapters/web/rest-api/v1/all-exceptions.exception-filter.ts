import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.log("🚀 ~ file: http-errors.exception-filter.ts ~ line 6 ~ AllExceptionsFilter ~ exception", exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            details: (exception as any).details,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
