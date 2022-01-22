import { inject, injectable } from "inversify";
import * as pino from "pino";
import { Logger as PinoLogger, LoggerOptions } from "pino";
import { ConfigService, ConfigServiceInjectionToken } from "src/secondary-adapters/services/config/config.interface";

import { AppConfig, appConfig, NODE_ENV } from "../../../configuration/app.config";
import { AsyncStorage, AsyncStorageInjectionToken } from "../async-storage/async-storage.interface";
import { ALS_TOKEN } from "./als";
import { BaseLogMessageProps } from "./interfaces/base-log-message-props.interface";
import { HttpLogger } from "./interfaces/http-logger.interface";
import { LOG_LEVEL } from "./interfaces/log-levels.enum";
import { LogRequestParams } from "./interfaces/log-request-params.interface";
import { RequestInfo } from "./interfaces/request-info.interface";
import { ResponseInfo } from "./interfaces/response-info.interface";

// todo consider adding formatting strategy to support JSON / CEF / etc formats

@injectable()
export class PinoLoggerService implements HttpLogger {
    private readonly logger: PinoLogger;

    public constructor(
        @inject(ConfigServiceInjectionToken) private readonly configService: ConfigService,
        @inject(ALS_TOKEN) private readonly asyncStorage: any,
    ) {
        const loggerOptions: LoggerOptions = {
            level: this.configService.get<AppConfig["logger"]>("logger").level,
        };

        if (appConfig.nodeEnv === NODE_ENV.LOCAL) {
            loggerOptions.prettyPrint = {
                colorize: true,
            };
        }

        this.logger = pino(loggerOptions);
    }

    public fatal(msg: string, args: Record<string, unknown>) {
        this.logger.fatal(msg, this.getTraceId());
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
        console.log("debug called");
        // pino().info("asdfsdf");
        // this.logger.info(msg, this.getTraceId());
        console.log("debug ended");
    }

    public logRequest({ method, path, headers, query, body, }: LogRequestParams) {
        const payload: RequestInfo = {
            ...this.composeBaseLogData(LOG_LEVEL.DEBUG),
            logMessage: "Request data",
            method,
            path,
            headers,
            query,
            body,
        };

        this.logger.debug(payload);
    }

    public logResponse(
        responseCode: ResponseInfo["responseCode"],
        responseBody: ResponseInfo["responseBody"],
        responseHeaders: ResponseInfo["responseHeaders"],
    ) {
        const payload: ResponseInfo = {
            ...this.composeBaseLogData(LOG_LEVEL.DEBUG),
            message: "Response data",
            responseCode,
            responseHeaders,
            responseBody,
        };

        this.logger.debug(payload);
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
