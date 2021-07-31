import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { DomainBaseException } from "src/core/shared/exceptions/app-base.exception";

import { DIContainer } from "../../../../lib/di-container";
import { ErrorMapper, ErrorMapperInjectionToken } from "./utils/error-mapping/error-mapper.interface";
import { RestErrorMapper } from "./utils/error-mapping/rest.error-mapper";
import { ResponseFormat } from "./utils/response-formatters/response-format.interface";

@Catch(DomainBaseException)
export class DomainExceptionsFilter implements ExceptionFilter {
    private readonly errorMapper: ErrorMapper;

    public constructor() {
        const container = DIContainer.getInstance();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.errorMapper = container.get<RestErrorMapper>(ErrorMapperInjectionToken);
    }

    catch(exception: DomainBaseException, host: ArgumentsHost) {
        console.log("🚀 ~ file: http-errors.exception-filter.ts ~ line 6 ~ AllExceptionsFilter ~ exception", exception);

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const httpException = this.getHttpException(exception);
        console.log("🚀 ~ file: all-exceptions.exception-filter.ts ~ line 28 ~ DomainExceptionsFilter ~ httpException", httpException);

        const responsePayload: ResponseFormat<null> = {
            data: null,
            errors: [],
            status,
            metadata: {},
        };

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(status).json(responsePayload);
    }

    private getHttpException(exception: DomainBaseException): HttpException {
        return this.errorMapper.mapException<HttpException>(exception);
    }
}
