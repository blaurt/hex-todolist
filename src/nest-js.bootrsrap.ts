import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { AuthMiddleware } from "./primary-adapters/web/rest-api/v1/middlewares/auth.middleware";
import { TraceIdMiddlware } from "./primary-adapters/web/rest-api/v1/middlewares/trace-id.middleware";

export async function bootstrap(port: number) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(TraceIdMiddlware);
    app.use(AuthMiddleware);

    const server = await app.listen(port);
    // app.on("listening", () => {
    //     const address = app.address();
    //     logger.info(`Listening on port ${address.port}`);
    // });

    // app.on("error", (error: Error) => {
    //     logger.error("Server start error: ", error);
    //     process.exit(1);
    // });
}
