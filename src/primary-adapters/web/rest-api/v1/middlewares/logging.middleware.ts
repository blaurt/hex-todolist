import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { DIContainer } from "src/lib/di-container";
import { HttpLogger, HttpLoggerInjectionToken } from "src/secondary-adapters/services/logger/interfaces/http-logger.interface";

/**
 * This middleware was made in Nest.js style, to be used within AppModule
 */
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private readonly logger: HttpLogger;

    public constructor() {
        this.logger = DIContainer.getInstance().get<HttpLogger>(HttpLoggerInjectionToken);
    }

    public use(request: Request, response: Response, next: NextFunction): void {
        const { method, path, headers, body: requestBody, query, } = request;

        this.logger.logRequest({
            method,
            path,
            headers,
            body: requestBody,
            query,
        });

        // response.on("finish", () => {
        //     const { statusCode, } = response;
        //     console.log("🚀 ~ file: logging.middleware.ts ~ line 30 ~ AppLoggerMiddleware ~ response.on ~ response", response);
        //     const contentLength = response.get("content-length");
        //     this.logger.logResponse(statusCode, {}, {});
        // });

        next();
    }
}
