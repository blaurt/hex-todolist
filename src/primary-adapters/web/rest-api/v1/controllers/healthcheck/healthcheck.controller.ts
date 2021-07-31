import { Controller, Get, Inject, Res } from "@nestjs/common";
import { Response } from "express";

import { ResponseFormat } from "../../utils/response-formatters/response-format.interface";
import { ResponseFormatter, ResponseFormatterInjectionToken } from "../../utils/response-formatters/response-formatter.interface";

@Controller([
    "v1/health",
    "v1/healthcheck",
])
export class HealthCheckController {
    public constructor(@Inject(ResponseFormatterInjectionToken) private readonly responseFormatter: ResponseFormatter) {}

    @Get("/")
    public async healthSelfGlobal(@Res() response: Response) {
        return response.redirect("/v1/health/self");
    }

    @Get("/self")
    public async healthCheck(): Promise<ResponseFormat<string>> {
        const response = "v1/rest-api is healthy";

        return this.responseFormatter.format(response);
    }
}
