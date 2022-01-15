import { AsyncLocalStorage } from "async_hooks";
import { inject, injectable } from "inversify";
import * as winston from "winston";

import { ALS_TOKEN } from "./als";
import { BaseLogMessageProps } from "./interfaces/base-log-message-props.interface";
import { HttpLogger } from "./interfaces/http-logger.interface";
import { LOG_LEVEL } from "./interfaces/log-levels.enum";
import { LogRequestParams } from "./interfaces/log-request-params.interface";
import { RequestInfo } from "./interfaces/request-info.interface";
import { ResponseInfo } from "./interfaces/response-info.interface";

@injectable()
export class WinstonLoggerService implements HttpLogger {
    private readonly logger: winston.Logger;

    public constructor(@inject(ALS_TOKEN) private readonly asyncStorage: AsyncLocalStorage<any>) {
        this.logger = winston.createLogger({
            level: LOG_LEVEL.INFO,
            format: winston.format.json(),
            defaultMeta: {},
            transports: [
                //
                // - Write all logs with level `error` and below to `error.log`
                // - Write all logs with level `info` and below to `combined.log`
                //
                new winston.transports.File({ filename: "error.log",
                    level: "error", }),
                new winston.transports.File({ filename: "combined.log", }),
            ],
        });

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        //

        if (process.env.NODE_ENV !== "production") {
            this.logger.add(
                new winston.transports.Console({
                    format: winston.format.simple(),
                }),
            );
        }
    }

    public fatal(msg: string, args: Record<string, unknown>) {
        this.logger.crit(msg, this.getTraceId());
    }

    public error(msg: string, args: Record<string, unknown>) {
        this.logger.error(msg, this.getTraceId());
    }

    public warn(msg: string, args: Record<string, unknown>) {
        this.logger.warn(msg, this.getTraceId());
    }

    public info(msg: string, args: Record<string, unknown>) {
        this.logger.info(msg, { traceId: this.getTraceId(), });
    }

    public debug(msg: string, args: Record<string, unknown>) {
        this.logger.debug(msg, this.getTraceId());
    }

    public logRequest({ method, path, headers, query, body, }: LogRequestParams) {
        const payload = {
            ...this.composeBaseLogData(LOG_LEVEL.INFO, "Request data"),
            logMessage: "Request data",
            method,
            path,
            headers,
            query,
            body,
        };

        this.logger.info(payload);
    }

    public logResponse(
        responseCode: ResponseInfo["responseCode"],
        responseBody: ResponseInfo["responseBody"],
        responseHeaders: ResponseInfo["responseHeaders"],
    ) {
        const payload: ResponseInfo = {
            ...this.composeBaseLogData(LOG_LEVEL.INFO),
            message: "Response data",
            responseCode,
            responseHeaders,
            responseBody,
        };

        this.logger.info(payload);
    }

    private composeBaseLogData(level: LOG_LEVEL, message: BaseLogMessageProps["message"] = "message_not_set"): BaseLogMessageProps {
        return {
            timestamp: new Date().toISOString(),
            requestId: this.getTraceId(),
            level,
            message,
        };
    }

    private getTraceId(): string {
        return this.asyncStorage.getStore().get("traceId");
    }
}
