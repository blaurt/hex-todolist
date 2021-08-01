import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { DomainBaseException } from "src/core/shared/exceptions/domain-base.exception";
import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

import { DIContainer } from "../../../../../lib/di-container";
import { ErrorMapper, ErrorMapperInjectionToken } from "../utils/error-mapping/error-mapper.interface";
import { RestErrorMapper } from "../utils/error-mapping/rest.error-mapper";
import { ResponseFormat } from "../utils/response-formatters/response-format.interface";

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
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const httpException = this.getHttpException(exception);
        const { message, details } = httpException.getResponse() as ErrorDescriptor;
        const responsePayload: ResponseFormat<null> = {
            data: null,
            error: { message, details },
            timestamp: new Date().toISOString(),
            path: request.url,
            metadata: {},
        };

        response.status(httpException.getStatus()).json(responsePayload);
    }

    private getHttpException(exception: DomainBaseException): HttpException {
        return this.errorMapper.mapException<HttpException>(exception);
    }
}
