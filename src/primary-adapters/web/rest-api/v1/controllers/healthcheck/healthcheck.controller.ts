import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { DIContainer } from "src/lib/di-container";
import { Logger, LoggerInjectionToken } from "src/secondary-adapters/services/logger/interfaces/logger.interface";

@Controller([
    "v1/health",
    "v1/healthcheck",
    "v1/health-check",
])
export class HealthCheckController {
    @Get("/")
    public async healthSelfGlobal(@Res() response: Response) {
        return response.redirect("/v1/health/self");
    }

    @Get("/self")
    public async healthCheck(): Promise<string> {
        const response = "v1/rest-api is healthy";

        return response;
    }
}
