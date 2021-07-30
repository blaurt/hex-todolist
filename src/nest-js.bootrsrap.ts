import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

export async function bootstrap(port: number) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
