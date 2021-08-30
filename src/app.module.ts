import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AppLoggerMiddleware } from "./primary-adapters/web/rest-api/v1/middlewares/logging.middleware";
import { RestApiModule } from "./primary-adapters/web/rest-api/v1/rest-api.module";

@Module({
    imports: [RestApiModule,],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes("*");
    }
}
