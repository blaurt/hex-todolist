import { Module } from "@nestjs/common";

import { DIContainer } from "../../../../lib/di-container";
import { SignInUseCase } from "../../../../use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "../../../../use-cases/auth/sign-up/sign-up.use-case";
import { AuthController } from "./controllers/auth/auth.controller";
import { HealthCheckController } from "./controllers/healthcheck/healthcheck.controller";
import { JsonResponseFormatter } from "./utils/response-formatters/json-response-formatter";
import { ResponseFormatterInjectionToken } from "./utils/response-formatters/response-formatter.interface";

@Module({
    controllers: [
        HealthCheckController,
        AuthController,
    ],
    providers: [
        {
            provide: ResponseFormatterInjectionToken,
            useClass: JsonResponseFormatter,
        },
        {
            provide: SignUpUseCase,
            useFactory: () => {
                const container = DIContainer.getInstance();
                container.get<SignUpUseCase>(SignUpUseCase);

                return container.get<SignUpUseCase>(SignUpUseCase);
            },
        },
        {
            provide: SignInUseCase,
            useFactory: () => {
                const container = DIContainer.getInstance();

                return container.get<SignInUseCase>(SignInUseCase);
            },
        },
    ],
})
export class RestApiModule {}
