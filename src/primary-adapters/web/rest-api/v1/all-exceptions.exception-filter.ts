import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { RestErrorMapper } from "./utils/rest.error-mapper";

import { ResponseFormat } from "./utils/response-formatters/response-format.interface";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly errorMapper: RestErrorMapper


    catch(exception: unknown, host: ArgumentsHost) {
        console.log("🚀 ~ file: http-errors.exception-filter.ts ~ line 6 ~ AllExceptionsFilter ~ exception", exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responsePayload: ResponseFormat<null> = {
            data: null,
            errors: [],
            status: 500,
            metadata: {},
        };

        response.status(status).json(responsePayload);
    }
}
