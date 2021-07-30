import { Module } from "@nestjs/common";

import { DIContainerFactory } from "../../../../lib/di-container.factory";
import { SignInUseCase } from "../../../../use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "../../../../use-cases/auth/sign-up/sign-up.use-case";
import { AuthController } from "./controllers/auth/auth.controller";
import { HealthCheckController } from "./controllers/healthcheck/healthcheck.controller";
import { JsonResponseFormatter } from "./response-formatters/json-response-formatter";
import { ResponseFormatterInjectionToken } from "./response-formatters/response-formatter.interface";

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
                const container = DIContainerFactory.getInstance();
                container.get<SignUpUseCase>(SignUpUseCase);

                return container.get<SignUpUseCase>(SignUpUseCase);
            },
        },
        {
            provide: SignInUseCase,
            useFactory: () => {
                const container = DIContainerFactory.getInstance();

                return container.get<SignInUseCase>(SignInUseCase);
            },
        },
    ],
})
export class RestApiModule {}
