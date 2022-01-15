import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AppLoggerMiddleware } from "./primary-adapters/web/rest-api/v1/middlewares/logging.middleware";
import { TraceIdMiddleware } from "./primary-adapters/web/rest-api/v1/middlewares/trace-id.middleware";
import { RestApiModule } from "./primary-adapters/web/rest-api/v1/rest-api.module";

@Module({
    imports: [RestApiModule,],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(TraceIdMiddleware).forRoutes("*");
        consumer.apply(AppLoggerMiddleware).forRoutes("*");
    }
}
