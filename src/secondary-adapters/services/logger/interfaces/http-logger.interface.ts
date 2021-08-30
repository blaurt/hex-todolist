import { LogRequestParams } from "./log-request-params.interface";
import { Logger } from "./logger.interface";
import { ResponseInfo } from "./response-info.interface";

export interface HttpLogger extends Logger {
    logRequest(params: LogRequestParams): void;

    logResponse(
        responseCode: ResponseInfo["responseCode"],
        responseBody: ResponseInfo["responseBody"],
        responseHeaders: ResponseInfo["responseHeaders"],
    ): void;
}

export const HttpLoggerInjectionToken = Symbol("HttpLogger");
