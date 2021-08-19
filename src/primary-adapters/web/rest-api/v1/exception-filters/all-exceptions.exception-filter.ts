import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { DIContainer } from "src/lib/di-container";

import { ResponseFormat } from "../utils/response-formatters/response-format.interface";
import { ResponseFormatter, ResponseFormatterInjectionToken } from "../utils/response-formatters/response-formatter.interface";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly responseFormatter: ResponseFormatter;

    public constructor() {
        const container = DIContainer.getInstance();
        this.responseFormatter = container.get<ResponseFormatter>(ResponseFormatterInjectionToken);
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responsePayload: ResponseFormat<null> = {
            data: null,
            error: { message: "Something went wrong",
                path: [], },
            timestamp: new Date().toISOString(),
            path: request.url,
            metadata: {},
        };

        response.status(status).json(responsePayload);
    }
}
